import { createContext, useContext, ReactNode } from "react";
import { useNewFileHook } from "../hooks/windowHooks/newFileHook";
import { useFileHook } from "../hooks/windowHooks/fileHook";
import { useProfileHook } from "../hooks/windowHooks/profileHook";
import { useConfigHook } from "../hooks/windowHooks/configHook";

type WindowContextType = {
    config: ReturnType<typeof useConfigHook>;
    file: ReturnType<typeof useFileHook>;
    profile: ReturnType<typeof useProfileHook>;
    newFile: ReturnType<typeof useNewFileHook>;
};

const WindowContext = createContext<WindowContextType | undefined>(undefined);

export const WindowProvider = ({ children }: { children: ReactNode }) => {
    const file = useFileHook();
    const profile = useProfileHook();
    const newFile = useNewFileHook();
    const config = useConfigHook()

    const hooks = {
        config,
        file,
        profile,
        newFile
    };

    return <WindowContext.Provider value={hooks}>{children}</WindowContext.Provider>;
};

export const useWindowContext = () => {
    const context = useContext(WindowContext);
    if (!context)
        throw new Error("useWindowContext must be used inside WindowProvider");
    return context;
};
