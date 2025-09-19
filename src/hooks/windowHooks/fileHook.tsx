import { useCallback, useState } from "react";
import { useRootContext } from "../../context/RootContext";

type Status = "open" | "minimazed" | "closed"

export const useFileHook = () => {
    const { root } = useRootContext()
    const [currentStatus, setCurrentStatus] = useState<Status>('closed')

    const openWindow = useCallback(() => {
        if (!root.canOpenWindow) return;
        setCurrentStatus("open")
    }, []);

    const minimizeWindow = useCallback(() => {
        setCurrentStatus("minimazed")
    }, []);

    const closeWindow = useCallback(() => {
        setCurrentStatus("closed")
    }, []);


    return {
        currentStatus,
        openWindow,
        minimizeWindow,
        closeWindow
    };
};
