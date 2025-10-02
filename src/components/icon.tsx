import { useRootContext } from "../context/RootContext";
import { useWindowContext } from "../context/WindowContext";
import { FullFileData } from "../services/file";

export type IconTypes = "folder" | "image" | "text" | "link" | "chat" | "calendar"

interface IconProps {
    id: string;
    name: string;
    type: IconTypes;
    img?: string;

}

export default function Icon(icon: FullFileData) {
    const { root } = useRootContext()
    const { file, openLink } = useWindowContext();
    if (icon.type === 'link') {
        console.log(icon)
    }

    function getDomainFromUrl(url: string): string {
        try {
            return new URL(url).hostname;
        } catch {
            return "";
        }
    }

    const returnImage = (type: IconTypes, img: string | null) => {
        const domain = getDomainFromUrl(icon.url as string)
        console.log(domain)
        switch (type) {
            case "folder":
                return "/assets/images/open-folder.png"
            case "text":
                return "/assets/images/text-file.png"
            case "link":
                return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`
            case "image":
                return img
            case "chat":
                return "/assets/images/chat-file.png"
            case "calendar":
                return "/assets/images/calendar-file.png"
            default:
                return img
        }
    }

    const returnAction = () => {
        if (!root.canOpenWindow) return;

        if (icon.type === 'link') {
            openLink.setUrl(icon.url as string)
            openLink.openWindow()
        } else {
            file.openWindow();
        }
    }

    return (
        <div onClick={returnAction} className="group select-none flex flex-col 
        items-center gap-2 w-20 p-1 px-2 rounded-sm transition-all cursor-pointer hover:bg-white/15">
            <img src={`${returnImage(icon.type, icon.imageUrl ?? null)}`} alt="iconImg" className="rounded-sm pointer-events-none select-none text-shadow-lg max-w-10" />
            <p className="group-hover:bg-black/60 select-none text-[14px] p-1 px-2 bg-black/30 backdrop-blur-sm transition-all rounded-md truncate max-w-19">{icon.name}</p>
        </div>
    )
}