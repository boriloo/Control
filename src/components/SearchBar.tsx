import { ExternalLink, Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function SearchBar() {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-[400px] relative">
            <Search className='absolute left-3 z-10 top-1/2 -translate-y-1/2 text-zinc-200 transition-all duration-300' />
            <input
                className="peer w-full h-10 pl-11 pr-4 cursor-pointer transition-all duration-300 outline-none border-1 border-transparent
                            bg-black/40 backdrop-blur-md hover:bg-black/45 focus:bg-black/55 focus:backdrop-blur-lg focus:border-blue-500 rounded-full"
                placeholder={t("dashboard.search")}
            />
            <div className="z-10 absolute opacity-0 transition-all pointer-events-none peer-focus:pointer-events-auto 
            peer-focus:opacity-100 flex flex-col bg-zinc-900 top-10 rounded-md w-full max-h-[300px] overflow-y-auto">

                <div className="min-h-13 group flex flex-row justify-between relative rounded-md cursor-pointer hover:bg-zinc-800 overflow-hidden transition-all">
                    <div className="flex flex-row gap-2 p-3 w-full items-center">
                        <img src="/assets/images/open-folder.png" className="w-7" />
                        <p>Pasta</p>
                    </div>
                    <p className="absolute bg-blue-500 h-full right-0 flex items-center justify-end  gap-2
                    transition-all text-center font-medium text-lg overflow-hidden max-w-0 w-full group-hover:pr-3 group-hover:max-w-[95px]">Abrir <ExternalLink size={20} /></p>
                </div>
                <div className="min-h-13 group flex flex-row justify-between relative rounded-md cursor-pointer hover:bg-zinc-800 overflow-hidden transition-all">
                    <div className="flex flex-row gap-2 p-3 w-full items-center">
                        <img src="/assets/images/open-folder.png" className="w-7" />
                        <p>Pasta</p>
                    </div>
                    <p className="absolute bg-blue-500 h-full right-0 flex items-center justify-end  gap-2
                    transition-all text-center font-medium text-lg overflow-hidden max-w-0 w-full group-hover:pr-3 group-hover:max-w-[95px]">Abrir <ExternalLink size={20} /></p>
                </div>
                <div className="min-h-13 group flex flex-row justify-between relative rounded-md cursor-pointer hover:bg-zinc-800 overflow-hidden transition-all">
                    <div className="flex flex-row gap-2 p-3 w-full items-center">
                        <img src="/assets/images/open-folder.png" className="w-7" />
                        <p>Pasta</p>
                    </div>
                    <p className="absolute bg-blue-500 h-full right-0 flex items-center justify-end  gap-2
                    transition-all text-center font-medium text-lg overflow-hidden max-w-0 w-full group-hover:pr-3 group-hover:max-w-[95px]">Abrir <ExternalLink size={20} /></p>
                </div>
                <div className="min-h-13 group flex flex-row justify-between relative rounded-md cursor-pointer hover:bg-zinc-800 overflow-hidden transition-all">
                    <div className="flex flex-row gap-2 p-3 w-full items-center">
                        <img src="/assets/images/open-folder.png" className="w-7" />
                        <p>Pasta</p>
                    </div>
                    <p className="absolute bg-blue-500 h-full right-0 flex items-center justify-end  gap-2
                    transition-all text-center font-medium text-lg overflow-hidden max-w-0 w-full group-hover:pr-3 group-hover:max-w-[95px]">Abrir <ExternalLink size={20} /></p>
                </div>
                <div className="min-h-13 group flex flex-row justify-between relative rounded-md cursor-pointer hover:bg-zinc-800 overflow-hidden transition-all">
                    <div className="flex flex-row gap-2 p-3 w-full items-center">
                        <img src="/assets/images/open-folder.png" className="w-7" />
                        <p>Pasta</p>
                    </div>
                    <p className="absolute bg-blue-500 h-full right-0 flex items-center justify-end  gap-2
                    transition-all text-center font-medium text-lg overflow-hidden max-w-0 w-full group-hover:pr-3 group-hover:max-w-[95px]">Abrir <ExternalLink size={20} /></p>
                </div>
                <div className="min-h-13 group flex flex-row justify-between relative rounded-md cursor-pointer hover:bg-zinc-800 overflow-hidden transition-all">
                    <div className="flex flex-row gap-2 p-3 w-full items-center">
                        <img src="/assets/images/open-folder.png" className="w-7" />
                        <p>Pasta</p>
                    </div>
                    <p className="absolute bg-blue-500 h-full right-0 flex items-center justify-end  gap-2
                    transition-all text-center font-medium text-lg overflow-hidden max-w-0 w-full group-hover:pr-3 group-hover:max-w-[95px]">Abrir <ExternalLink size={20} /></p>
                </div>
                <div className="min-h-13 group flex flex-row justify-between relative rounded-md cursor-pointer hover:bg-zinc-800 overflow-hidden transition-all">
                    <div className="flex flex-row gap-2 p-3 w-full items-center">
                        <img src="/assets/images/open-folder.png" className="w-7" />
                        <p>Pasta</p>
                    </div>
                    <p className="absolute bg-blue-500 h-full right-0 flex items-center justify-end  gap-2
                    transition-all text-center font-medium text-lg overflow-hidden max-w-0 w-full group-hover:pr-3 group-hover:max-w-[95px]">Abrir <ExternalLink size={20} /></p>
                </div>
                <div className="min-h-13 group flex flex-row justify-between relative rounded-md cursor-pointer hover:bg-zinc-800 overflow-hidden transition-all">
                    <div className="flex flex-row gap-2 p-3 w-full items-center">
                        <img src="/assets/images/open-folder.png" className="w-7" />
                        <p>Pasta</p>
                    </div>
                    <p className="absolute bg-blue-500 h-full right-0 flex items-center justify-end  gap-2
                    transition-all text-center font-medium text-lg overflow-hidden max-w-0 w-full group-hover:pr-3 group-hover:max-w-[95px]">Abrir <ExternalLink size={20} /></p>
                </div>
            </div>
        </div>
    )
}