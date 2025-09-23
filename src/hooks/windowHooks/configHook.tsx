import { useCallback, useState } from "react";

type Status = "open" | "minimized" | "closed"

export const useConfigHook = () => {
    const [currentStatus, setCurrentStatus] = useState<Status>('closed');

    const openWindow = useCallback(() => {
        setCurrentStatus("minimized");
        setTimeout(() => {
            setCurrentStatus("open");
        }, 10);
    }, []);

    const minimizeWindow = useCallback(() => {
        setCurrentStatus("minimized");
    }, []);

    const closeWindow = useCallback(() => {
        setCurrentStatus("minimized");
        setTimeout(() => {
            setCurrentStatus(prev => prev === "minimized" ? "closed" : prev);
        }, 400);
    }, []);

    return {
        currentStatus,
        openWindow,
        minimizeWindow,
        closeWindow
    };
};
