import { useWindowStatus } from "../windowHook";

export const useFileHook = () => {
    const { currentStatus, openWindow, minimizeWindow, closeWindow } = useWindowStatus();

    return {
        currentStatus,
        openWindow,
        minimizeWindow,
        closeWindow
    };
};
