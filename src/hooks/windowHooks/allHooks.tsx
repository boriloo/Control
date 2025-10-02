import { useConfigHook } from "./configHook";
import { useFileHook } from "./fileHook";
import { useListDesktopHook } from "./listDesktopHook";
import { useNewDesktopHook } from "./newDesktopHook";
import { useNewFileHook } from "./newFileHook";
import { useOpenLinkHook } from "./openLinkHook";
import { useProfileHook } from "./profileHook";

export function useAllWindows() {
    return {
        file: useFileHook(),
        listdt: useListDesktopHook(),
        profile: useProfileHook(),
        config: useConfigHook(),
        newFile: useNewFileHook(),
        newdt: useNewDesktopHook(),
        openLink: useOpenLinkHook(),
    };
}