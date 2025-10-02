import { useState } from "react";
import { useWindowStatus } from "../windowHook";

export const useOpenLinkHook = () => {
    const [url, setUrl] = useState<string | null>(null)
    const { currentStatus, openWindow, closeWindow } = useWindowStatus();

    return {
        url,
        setUrl,
        currentStatus,
        openWindow,
        closeWindow
    };
};
