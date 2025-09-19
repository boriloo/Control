import { useUser } from "../../../context/AuthContext"
import { ClickableImageInput } from "../../imageInput"

export default function AppearanceOption() {
    const { user, currentDesktop, hasDesktops, authLogoutUser } = useUser()

    const handleEditBackground = async () => {

    }

    return (
        <div className="flex flex-col items-start gap-4 p-4 w-full">
            {hasDesktops && (<h1 className="text-[25px] flex">Desktop atual - {currentDesktop.name} ({currentDesktop.type})</h1>)}
            <div className="w-full h-[1px] bg-zinc-600"></div>
            <p>Tela de fundo</p>
            <ClickableImageInput onFileSelected={(file) => {
                console.log(file)
            }} />
            <button onClick className="border-1 border-blue-500 transition-all cursor-pointer hover:bg-blue-500 p-2 px-3 rounded-sm font-medium">Alterar fundo</button>
        </div>
    )
}