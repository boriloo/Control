import { useEffect, useState } from "react";

export default function DashboardPage() {
    const [start, setStart] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setStart(true)
        }, 100)
    }, [])

    return (
        <>
            <div className={`scale-101 flex min-h-screen w-full fixed bg-black bg-[url('/assets/images/authBG.jpg')] bg-cover bg-center transition-all duration-500 z-[-1]`}></div>
            <div className="flex flex-col w-full min-h-full">
                <div>qhqhqeh</div>
                <div className={` ${start ? 'max-h-10' : 'max-h-0'} flex flex-row justify-center items-center gap-2 h-10 w-full bg-zinc-900 mt-auto overflow-hidden transition-all duration-600`}>
                    <img src="/assets/images/profile.png" alt="profile" className=" p-1.5 px-2 h-full transition-all cursor-pointer hover:bg-zinc-500/30" />
                </div>
            </div>
        </>
    )
}