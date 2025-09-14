import { useCallback } from "react";

export const useAppHook = () => {

    const minimazeAllWindows = useCallback(() => {

    }, []);

    const closeAllWindows = useCallback(() => {

    }, []);


    return {
        minimazeAllWindows,
        closeAllWindows
    };
};
