import { createContext, useContext, ReactNode } from "react";
import { useAppHook } from "../hooks/appHooks";

type AppContextType = {
    app: ReturnType<typeof useAppHook>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
    const app = useAppHook();

    const hooks = {
        app,
    };

    return <AppContext.Provider value={hooks}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context)
        throw new Error("useAppContext must be used inside AppProvider");
    return context;
};
