import { createContext, useContext, ReactNode } from "react";
import { useProfileHook } from "../hooks/profileHook";

type AppContextType = {
    profile: ReturnType<typeof useProfileHook>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const profile = useProfileHook();

    const hooks = {
        profile
    };

    return <AppContext.Provider value={hooks}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context)
        throw new Error("useAppContext must be used inside AppProvider");
    return context;
};
