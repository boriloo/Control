import { useCallback, useState } from "react";

type Status = "open" | "closed"

export const useNewFileHook = () => {
    const [currentStatus, setCurrentStatus] = useState<Status>('closed')

    const openWindow = useCallback(() => {
        setCurrentStatus("open")
    }, []);

    const closeWindow = useCallback(() => {
        setCurrentStatus("closed")
    }, []);


    return {
        currentStatus,
        openWindow,
        closeWindow
    };
};
