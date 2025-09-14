import { useCallback, useState } from "react";

type Status = "open" | "minimazed" | "closed"

export const useProfileHook = () => {
    const [currentStatus, setCurrentStatus] = useState<Status>('closed')

    const openWindow = useCallback(() => {
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
