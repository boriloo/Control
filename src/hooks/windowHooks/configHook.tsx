import { useCallback, useEffect, useState } from "react";

type Status = "open" | "minimazed" | "closed"

export const useConfigHook = () => {
    const [currentStatus, setCurrentStatus] = useState<Status>('closed')

    useEffect(() => {
        console.log(currentStatus)
    }, [currentStatus])

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
