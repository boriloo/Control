import { useState } from "react"
import { ClickableImageInput } from "../imageInput";
import { createDesktop, updateDesktopBackground } from "../../services/desktop";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { useUser } from "../../context/AuthContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface PersonalProps {
    onFinish: (boolean: true) => void;
}


export default function PersonalDesktopWindow({ onFinish }: PersonalProps) {
    const { user, setCurrentDesktop } = useUser();
    const [imageSelected, setImageSelected] = useState<File>()
    const [desktopName, setDesktopName] = useState<string | null>()
    const [loading, setLoading] = useState<boolean>(false)
    const [done, setDone] = useState<boolean>(false)
    const [done2, setDone2] = useState<boolean>(false)
    const [percentage, setPercentage] = useState<number>(0)

    const handleSubmit = async () => {
        try {
            console.log(user)
            setLoading(true)
            if (!imageSelected || !user || !desktopName) return;
            const newDesktop = await createDesktop({ name: desktopName, type: 'personal', ownerId: user.uid as string, members: [user.uid as string] })

            setPercentage(prev => (prev + 16.66))

            const storage = getStorage();
            setPercentage(prev => (prev + 16.66))

            const storageRef = ref(storage, `desktops/${newDesktop.id}/background`);
            setPercentage(prev => (prev + 16.66))

            const snapshot = await uploadBytes(storageRef, imageSelected);
            setPercentage(prev => (prev + 16.66))

            const downloadURL = await getDownloadURL(snapshot.ref);
            setPercentage(prev => (prev + 16.66))

            console.log('ESSE É O DOWNLOAD: ', downloadURL)

            const updatedDesktop = await updateDesktopBackground(newDesktop.id, downloadURL)
            setCurrentDesktop(updatedDesktop)
            setPercentage(prev => (prev + 18.66))
            setTimeout(() => {
                setDone(true)
                setTimeout(() => {
                    setDone2(true)
                    setTimeout(() => {
                        onFinish(true)
                    }, 1000)
                }, 2000)
            }, 1000)
        } catch (err) {
            console.log('Erro ao criar: ', err)
            setLoading(false)
        }
    }


    return (
        <div
            className={`${done2 ? '' : 'bg-zinc-900'} absolute z-200  w-full min-h-screen flex justify-center items-center p-4`}>
            <div className={`${done2 ? 'opacity-0 pointer-events-none' : done ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-all duration-500 absolute z-200 bg-zinc-900 w-full min-h-screen flex justify-center items-center p-4`}>
                <h1 className={`${done ? 'opacity-100 mt-0' : 'opacity-0 mt-7'} transition-all duration-700 text-[40px] text-center`}>Tudo pronto. <br /> Aproveite :)</h1>
            </div>
            {loading ?
                (<div className={`${done2 ? 'opacity-0' : ''} flex flex-col gap-2 items-center w-full max-w-[600px]`}>
                    <DotLottieReact
                        src="https://lottie.host/e580eaa4-d189-480f-a6ce-f8c788dff90d/MP2FjoJFFE.lottie"
                        className="w-26 p-0"
                        loop
                        autoplay
                    />
                    <h1 className="text-[30px] text-center">Seu desktop está sendo feito...</h1>
                    <div className="mt-2 w-full h-6 bg-zinc-300 rounded-md overflow-hidden relative">
                        <div style={{ width: `${percentage}%` }} className={`absolute h-full transition-all duration-150 bg-blue-500`}>
                        </div>
                    </div>
                </div>)
                :
                (<div className="flex flex-col items-start w-full max-w-[1000px] gap-8">
                    <h1 className="text-[55px] gap-1">Crie seu primeiro <p className="text-blue-500">Desktop</p></h1>
                    <div className="flex flex-col gap-1 w-full">
                        <p className="text-xl">Nome</p>
                        <input type="text" onChange={(e) => setDesktopName(e.target.value)} className="outline-none transition-all text-lg hover:bg-zinc-800 border-b-1 
                    cursor-pointer focus:cursor-text p-1 px-2 rounded-t-sm focus:border-blue-500 focus:text-blue-100 border-white/50 w-full max-w-[500px]" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-lg">Tela de fundo</p>
                        <ClickableImageInput onFileSelected={(file) => {
                            setImageSelected(file)
                            console.log(imageSelected)
                        }} />
                        {!imageSelected && (
                            <p>(Caso não escolhida, será a padrão)</p>
                        )}
                    </div>

                    <button onClick={handleSubmit} disabled={!imageSelected || !desktopName} className={`${!imageSelected || !desktopName ? 'pointer-events-none saturate-0 opacity-40' : ''}
                    bg-blue-500 border-none text-xl p-2 px-6 font-medium cursor-pointer rounded-sm transition-all hover:bg-blue-600`}>
                        Criar Desktop
                    </button>
                </div>)}

        </div >
    )
}


