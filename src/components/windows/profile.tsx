import { LogOut, Maximize, Minus, Pencil, X } from "lucide-react"
import { useState } from "react"
import { useUser } from "../../context/AuthContext";
import { useWindowContext } from "../../context/WindowContext";
import { returnFilterEffects } from "../../types/auth";
import { useAppContext } from "../../context/AppContext";

export default function ProfileWindow() {
    const { minimazeAllWindows } = useAppContext();
    const { user, authLogoutUser } = useUser();
    const { profile, config } = useWindowContext();
    const [isFullsceen, setIsFullscreen] = useState<boolean>(false)

    if (!user) return;

    const handleAreaClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target != e.currentTarget) return;
        profile.closeWindow();
    }


    return (

        <div onClick={handleAreaClick} className={`${isFullsceen ? 'pb-[40px]' : ' p-2 pb-[50px]'} ${profile.currentStatus === "open" ? returnFilterEffects() : 'pointer-events-none'} 
        fixed z-100 flex-1 flex justify-center items-center w-full h-screen transition-all duration-500 cursor-pointer`}>
            <div className={`${isFullsceen ? 'max-w-full max-h-full' : 'rounded-lg max-w-[1200px] max-h-[700px]'} ${profile.currentStatus === "open" ? 'scale-100' : 'scale-0 '} 
                bg-zinc-900 cursor-default origin-bottom relative transition-all duration-300 flex flex-col w-full h-full overflow-y-auto`}>
                <div className="z-50 sticky select-none top-0 w-full bg-black/50 h-8 flex flex-row justify-between items-center backdrop-blur-[2px]">
                    <p className="p-2">Seu Perfil</p>
                    <div className="flex flex-row h-full">
                        <Minus onClick={profile.minimizeWindow} className="transition-colors cursor-pointer p-1 px-2 w-9 h-full hover:bg-white/20" />
                        <Maximize onClick={() => setIsFullscreen(!isFullsceen)} className="transition-colors cursor-pointer p-1 px-2 w-9 h-full hover:bg-white/20" />
                        <X onClick={profile.closeWindow} className="transition-colors cursor-pointer p-1 px-2 w-9 h-full hover:bg-red-500" />
                    </div>
                </div>
                <div className="flex flex-col w-full p-4 gap-4 items-center">
                    <button onClick={() => {
                        config.setCurrentTab('account');
                        minimazeAllWindows();
                        config.openWindow();
                    }} className="flex flex-row gap-2 items-center p-1 mb-2 text-[16px] 
                px-3 border-[1.5px] border-white/50 cursor-pointer rounded-md bg-zinc-800 text-white transition-all hover:border-blue-500 hover:text-blue-500 hover:bg-zinc-950">
                        <p>Editar Perfil</p>
                        <Pencil size={16} />
                    </button>

                    <div className="flex flex-col h-30 items-center select-none">
                        <img src={`${user.profileImage || "/assets/images/profile.png"}`} alt="" className="z-20 w-30 h-30 rounded-full" />
                        <img src={`${user.profileImage || "/assets/images/profile.png"}`} alt="" className="z-[-1] w-35 h-30 blur-[40px] opacity-40 translate-y-[-100%]" />
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <h1 className="text-[25px]">{user.name as string} </h1>
                        <p className="text-[14px]">{user.email as string}</p>
                    </div>
                    <div className="w-[90%] h-[1px] bg-zinc-400"></div>
                </div>


                <button onClick={authLogoutUser} className="sticky bottom-4 mt-auto ml-auto right-4 flex flex-row gap-2 items-center p-1 text-[18px] 
                px-5 border-[1.5px] border-white/50 cursor-pointer rounded-md bg-zinc-950 text-white transition-all hover:border-red-500 hover:text-red-500">
                    <p>Sair</p>
                    <LogOut size={18} />
                </button>
            </div>
        </div >
    )
}