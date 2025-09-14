export type IconTypes = "folder" | "image" | "text" | "link"

interface IconProps {
    id: string;
    name: string;
    type: IconTypes;
    img?: string;
}

export default function Icon({ id, name, type, img }: IconProps) {

    const returnImage = (type: IconTypes, img: string | null) => {
        switch (type) {
            case "folder":
                return "/assets/images/open-folder.png"
            case "text":
                return "/assets/images/text-file.png"
            case "link":
                return "/assets/images/link.png"
            case "image":
                return img
            default:
                break;
        }
    }

    return (
        <div className="select-none flex flex-col items-center gap-2 w-20 p-2 px-4 rounded-sm transition-all cursor-pointer hover:bg-white/20">
            <img src={`${returnImage(type, img ?? '')}`} alt="iconImg" className=" pointer-events-none select-none text-shadow-lg max-w-10" />
            <p className="text-shadow-lg select-none text-[14px] p-1 px-2 bg-black/20 rounded-md backdrop-blur-md truncate max-w-20">{name}</p>
        </div>
    )
}