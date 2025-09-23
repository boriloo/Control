import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
    useCallback,
} from "react";
import { getUserProfile, loginUser, registerUser, updateUserFilters } from "../services/auth";
import { browserLocalPersistence, browserSessionPersistence, onAuthStateChanged, setPersistence, signOut, UserProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useAppContext } from "./AppContext";
import { FullDesktopData, getDesktopsByOwner } from "../services/desktop";
import { BasicFilter, ColorFilter } from "../types/auth";


interface UserContextProps {
    isAuthenticated: boolean;
    user: UserProfile | null;
    currentDesktop: FullDesktopData | null;
    changeCurrentDesktop: (desktop: FullDesktopData) => void;
    authLoginUser: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    authRegisterUser: (name: string, email: string, password: string, rememberMe: boolean, filterDark: BasicFilter, filterBlur: BasicFilter, filterColor: ColorFilter) => Promise<void>;
    authLogoutUser: () => Promise<void>;
    authChangeUserFilters: (filterDark: BasicFilter, filterBlur: BasicFilter, filterColor: ColorFilter) => Promise<void>;
    isLoading: boolean;
    hasDesktops: boolean;
    setHasDesktops: (value: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { closeAllWindows } = useAppContext();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentDesktop, setCurrentDesktop] = useState<FullDesktopData | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasDesktops, setHasDesktops] = useState<boolean>(false);

    const changeCurrentDesktop = useCallback((desktop: FullDesktopData) => {
        setCurrentDesktop(desktop)
    }, [currentDesktop])


    async function authLoginUser(email: string, password: string, rememberMe: boolean) {
        try {
            const persistenceType = rememberMe
                ? browserLocalPersistence
                : browserSessionPersistence;

            await setPersistence(auth, persistenceType);

            const user = await loginUser({ email, password });

            const userProfile = await getUserProfile(user.uid)
            setUser(userProfile);
        } catch (err) {
            throw err;
        }
    }

    async function authRegisterUser(name: string, email: string, password: string, rememberMe: boolean, filterDark: BasicFilter, filterBlur: BasicFilter, filterColor: ColorFilter) {
        try {
            const persistenceType = rememberMe
                ? browserLocalPersistence
                : browserSessionPersistence;

            await setPersistence(auth, persistenceType);

            const user: UserProfile = await registerUser({ name, email, password, filterDark, filterBlur, filterColor });
            const userProfile = await getUserProfile(user.uid as string)
            setUser(userProfile);

        } catch (err) {
            throw err;
        }
    }

    async function authLogoutUser() {
        try {
            closeAllWindows()
            signOut(auth)
            setIsAuthenticated(false)
            setUser(null)
            setHasDesktops(false)
            setCurrentDesktop(null)
            localStorage.setItem('background', '');
        } catch (err) {
            throw err;
        }
    }

    async function authChangeUserFilters(filterDark: BasicFilter, filterBlur: BasicFilter, filterColor: ColorFilter) {
        try {
            if (!user) return;
            const updatedUser = await updateUserFilters(
                user.uid as string,
                filterDark,
                filterBlur,
                filterColor
            );
            console.log('FILTROS ATUALIZADOS COM SUCESSO! ', updatedUser)
            setUser(updatedUser)
        } catch (err) {
            throw err;
        }
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                console.log('SEM USER')
                return;
            };
            setIsAuthenticated(true);
            try {
                const desktops = await getDesktopsByOwner(user.uid as string);
                if (desktops.length === 0) return;
                setHasDesktops(true);
                changeCurrentDesktop(desktops[0])
            } catch (err) {
                alert(err)
            }
            const userProfile = await getUserProfile(user.uid)
            if (!userProfile) return;
            setUser(userProfile);
        });
        setIsLoading(false)

        return () => unsubscribe();
    }, []);




    return (
        <UserContext.Provider
            value={{
                isAuthenticated,
                user,
                currentDesktop,
                changeCurrentDesktop,
                authLoginUser,
                authChangeUserFilters,
                authRegisterUser,
                isLoading,
                authLogoutUser,
                hasDesktops,
                setHasDesktops
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const ctx = useContext(UserContext);
    if (!ctx) throw new Error("useUser deve ser usado dentro de <AuthProvider>");
    return ctx;
}
