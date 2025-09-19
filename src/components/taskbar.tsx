import { useAppContext } from "../context/AppContext";
import { useWindowContext } from "../context/WindowContext";


export default function TaskBar() {
    const { profile, config } = useWindowContext();
    const { app } = useAppContext();

    return (
        <div className="max-h-10 z-100 fixed bottom-0 flex flex-row justify-center items-center gap-2 h-10 w-full backdrop-blur-sm bg-black/60 overflow-hidden transition-all duration-600">
            <img onClick={() => {
                app.minimazeAllWindows()
                config.openWindow()
            }} src="/assets/images/settings.png" alt="profile" className=" p-1.5 px-2 h-full transition-all cursor-pointer hover:bg-zinc-500/30" />
            <img onClick={() => {
                app.minimazeAllWindows()
                profile.openWindow()
            }} src="/assets/images/profile.png" alt="profile" className=" p-1.5 px-2 h-full transition-all cursor-pointer hover:bg-zinc-500/30" />
        </div>
    )
}