import { useRootContext } from "../context/RootContext";
import { useWindowContext } from "../context/WindowContext";

export type IconTypes = "folder" | "image" | "text" | "link" | "chat" | "calendar"

interface IconProps {
    id: string;
    name: string;
    type: IconTypes;
    img?: string;
}

export default function Icon({ id, name, type, img }: IconProps) {
    const { root } = useRootContext()
    const { file } = useWindowContext();

    function getDomainFromUrl(url: string): string {
        try {
            return new URL(url).hostname;
        } catch {
            return "";
        }
    }

    const returnImage = (type: IconTypes, img: string | null) => {
        const domain = getDomainFromUrl("https://www.youtube.com/watch?v=DoIrrlHgsGM");
        switch (type) {
            case "folder":
                return `https://www.google.com/s2/favicons?domain=${domain}&sz=256`;
            case "text":
                return "/assets/images/text-file.png"
            case "link":
                return "/assets/images/link.png"
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

    return (
        <div onClick={() => { if (root.canOpenWindow) file.openWindow(); }} className="group select-none flex flex-col items-center gap-2 w-20 p-2 px-4 rounded-sm transition-all cursor-pointer hover:bg-white/15">
            <img src={`${returnImage(type, img ?? '')}`} alt="iconImg" className="rounded-sm pointer-events-none select-none text-shadow-lg max-w-10" />
            <p className="group-hover:bg-black/60 select-none text-[14px] p-1 px-2 bg-black/30 backdrop-blur-sm transition-all rounded-md truncate max-w-20">{name}</p>
        </div>
    )
}