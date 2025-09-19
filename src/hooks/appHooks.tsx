import { useCallback } from "react";
import { useWindowContext } from "../context/WindowContext";

export const useAppHook = () => {
    const { file, profile, newFile, config } = useWindowContext()

    const minimazeAllWindows = useCallback(() => {
        config.minimizeWindow()
        file.minimizeWindow()
        profile.minimizeWindow()
        newFile.closeWindow()
    }, []);

    const closeAllWindows = useCallback(() => {
        file.closeWindow()
        profile.closeWindow()
        newFile.closeWindow()
    }, []);


    return {
        minimazeAllWindows,
        closeAllWindows
    };
};
