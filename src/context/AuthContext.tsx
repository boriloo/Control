import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { getUserProfile, loginUser, registerUser } from "../services/auth";
import { Auth, browserLocalPersistence, browserSessionPersistence, onAuthStateChanged, setPersistence, signOut, User, UserProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import { getDesktopsByOwner } from "../services/desktop";


interface UserContextProps {
    isAuthenticated: boolean;
    user: UserProfile | null;
    authLoginUser: (email: string, password: string, rememberMe: boolean) => Promise<void>;
    authRegisterUser: (name: string, email: string, password: string, rememberMe: boolean) => Promise<void>;
    authLogoutUser: () => Promise<void>;
    isLoading: boolean;
    hasDesktops: boolean;
    setHasDesktops: (value: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { app } = useAppContext();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [hasDesktops, setHasDesktops] = useState<boolean>(false);

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

    async function authRegisterUser(name: string, email: string, password: string, rememberMe: boolean) {
        try {
            const persistenceType = rememberMe
                ? browserLocalPersistence
                : browserSessionPersistence;

            await setPersistence(auth, persistenceType);

            const userProfile: UserProfile = await registerUser({ name, email, password });
            setUser(userProfile);

        } catch (err) {
            throw err;
        }
    }

    async function authLogoutUser() {
        try {
            app.closeAllWindows()
            signOut(auth)
            setIsAuthenticated(false)
            setUser(null)
        } catch (err) {
            throw err;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) return;
            setIsAuthenticated(true);
            try {
                const desktops = await getDesktopsByOwner(user.uid as string);
                setHasDesktops(desktops.length > 0);
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
                authLoginUser,
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
