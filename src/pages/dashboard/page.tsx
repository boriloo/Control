import { useEffect, useState, useRef, useCallback } from "react";
import { DraggableData, DraggableEvent } from 'react-draggable';
import { ArrowDownToLine, ArrowLeftToLine, ArrowRightToLine, ArrowUpToLine, CirclePlus } from "lucide-react";
import { DraggableIcon } from "./draggableIcon";
import { useDraggableScroll } from "./dragScroll";
import { IconTypes } from "../../components/icon";
import ProfileWindow from "../../components/windows/profile";
import { useAppContext } from "../../context/AppContext";
import NewFileWindow from "../../components/windows/newFile";

type IconData = {
    id: string;
    name: string;
    type: IconTypes;
    position: { x: number; y: number };
};

const initialIcons: IconData[] = [
    { id: 'folder-1', name: 'Pasta', type: 'folder', position: { x: 100, y: 0 } },
    { id: 'link-1', name: 'Texto', type: 'text', position: { x: 0, y: 100 } },
    { id: 'text-1', name: 'Youtube', type: 'link', position: { x: 0, y: 0 } },
];

const findNextAvailablePosition = (icons: IconData[], containerWidth: number): { x: number; y: number } | null => {
    const GRID_SIZE = 100;
    const occupiedPositions = new Set(
        icons.map(icon => `${icon.position.x},${icon.position.y}`)
    );

    for (let y = 0; y > -1; y += GRID_SIZE) {
        for (let x = 0; x < containerWidth - 80; x += GRID_SIZE) {
            const currentPosition = `${x},${y}`;
            if (!occupiedPositions.has(currentPosition)) {
                return { x, y };
            }
        }
    }
    return null;
};

export default function DashboardPage() {
    const { profile } = useAppContext();
    const [start, setStart] = useState<boolean>(false);
    useEffect(() => {
        setTimeout(() => { setStart(true) }, 100);
    }, []);

    const [icons, setIcons] = useState<IconData[]>(initialIcons);
    const desktopRef = useRef<HTMLDivElement>(null);
    const [contentToRight, setContentToRight] = useState<boolean>(false)
    const [contentToBottom, setContentToBottom] = useState<boolean>(false)
    const [contentToLeft, setContentToLeft] = useState<boolean>(false)
    const [contentToTop, setContentToTop] = useState<boolean>(false)

    const checkOverflow = useCallback(() => {
        const desktopEl = desktopRef.current;
        if (!desktopEl) return;

        const hasContentToLeft = desktopEl.scrollLeft > 0;
        const hasContentToTop = desktopEl.scrollTop > 0;

        const isAtHorizontalEnd = Math.abs(desktopEl.scrollWidth - desktopEl.clientWidth - desktopEl.scrollLeft) < 1;
        const isAtVerticalEnd = Math.abs(desktopEl.scrollHeight - desktopEl.clientHeight - desktopEl.scrollTop) < 1;

        // A lógica agora apenas verifica se há mais conteúdo para rolar
        const hasHorizontalOverflow = desktopEl.scrollWidth > desktopEl.clientWidth;
        const hasVerticalOverflow = desktopEl.scrollHeight > desktopEl.clientHeight;

        setContentToLeft(hasContentToLeft);
        setContentToTop(hasContentToTop);
        setContentToRight(hasHorizontalOverflow && !isAtHorizontalEnd);
        setContentToBottom(hasVerticalOverflow && !isAtVerticalEnd);
    }, []);

    const initialDragState = useRef<IconData[] | null>(null);

    const handleDragStart = () => {
        initialDragState.current = icons;
    };

    const handleDrag = (e: DraggableEvent, data: DraggableData, draggedIconId: string) => {
        if (!initialDragState.current) return;
        const GRID_SIZE = 100;
        const roundToGrid = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;
        const currentPosition = { x: roundToGrid(data.x), y: roundToGrid(data.y) };
        const originalIcons = initialDragState.current;
        const draggedIconOriginal = originalIcons.find(i => i.id === draggedIconId);
        if (!draggedIconOriginal) return;

        const targetIcon = originalIcons.find(icon =>
            icon.id !== draggedIconId &&
            currentPosition.x === icon.position.x &&
            currentPosition.y === icon.position.y
        );

        if (targetIcon) {
            setIcons(originalIcons.map(icon => {
                if (icon.id === draggedIconId) return { ...icon, position: targetIcon.position };
                if (icon.id === targetIcon.id) return { ...icon, position: draggedIconOriginal.position };
                return icon;
            }));
        } else {
            setIcons(originalIcons.map(icon =>
                icon.id === draggedIconId ? { ...icon, position: currentPosition } : icon
            ));
        }

        checkOverflow();
    };

    const handleDragStop = () => {
        initialDragState.current = null;
    };

    const handleCreateIcon = () => {
        const container = desktopRef.current;
        if (!container) return;
        const position = findNextAvailablePosition(icons, container.clientWidth);
        if (position) {
            const newIcon: IconData = {
                id: crypto.randomUUID(),
                name: 'Nova Pasta',
                type: 'folder',
                position: position,
            };
            setIcons(prevIcons => [...prevIcons, newIcon]);
        } else {
            alert("Não há mais espaço no desktop!");
        }
    };

    useDraggableScroll(desktopRef);

    useEffect(() => {
        const desktopEl = desktopRef.current;
        if (!desktopEl) return;

        desktopEl.addEventListener('scroll', checkOverflow);
        window.addEventListener('resize', checkOverflow);
        checkOverflow();

        return () => {
            desktopEl.removeEventListener('scroll', checkOverflow);
            window.removeEventListener('resize', checkOverflow);
        };
    }, [icons, checkOverflow]);



    return (
        <>
            <div className="pointer-events-none fixed z-50 flex justify-center items-center w-full min-h-screen">
                <p className={`${start ? 'opacity-0' : 'opacity-100'} control-text text-[50px] transition-all duration-500`}>Control</p>
            </div>
            <div className={`${start ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 scale-101 flex min-h-screen w-full fixed bg-black bg-[url('/assets/images/authBG3.jpg')] bg-cover bg-center z-[-1]`}></div>
            {/* <div className="fixed top-0 w-full min-h-screen backdrop-blur-[2px] z-10 flex justify-center items-center p-4">
                <div className="bg-zinc-600 w-[600px] h-[500px]"></div>

            </div> */}
            <NewFileWindow />
            <ProfileWindow />
            <div className={`${start ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 flex flex-col w-full h-screen overflow-hidden text-white`}>
                <div className="flex flex-row flex-wrap justify-between items-center w-full gap-3 p-4">
                    <button onClick={handleCreateIcon}
                        className="flex flex-row items-center gap-2 p-1 px-3 cursor-pointer rounded-md bg-black/20 hover:bg-black/40 border-[1px] 
                border-transparent hover:text-blue-500 hover:border-blue-500 backdrop-blur-md transition-all">
                        <CirclePlus />
                        <p className="text-lg">Criar</p>
                    </button>
                </div>

                <ArrowLeftToLine onClick={
                    () => {
                        if (!desktopRef.current) return;
                        desktopRef.current.scrollLeft = 0
                    }
                } className={`${contentToLeft ? 'opacity-100' : 'opacity-0'} border-transparent border-[2px] hover:border-blue-500 cursor-pointer transition-all z-20 w-15 h-15 p-3 
                    text-blue-500 rounded-full bg-black/30 backdrop-blur-md fixed left-3 top-[50%] translate-y-[-100%]`} />
                <ArrowUpToLine onClick={
                    () => {
                        if (!desktopRef.current) return;
                        desktopRef.current.scrollTop = 0
                    }
                } className={`${contentToTop ? 'opacity-100' : 'opacity-0'} border-transparent border-[2px] hover:border-blue-500 cursor-pointer transition-all z-20 w-15 h-15 p-3 
                    text-blue-500 rounded-full bg-black/30 backdrop-blur-md fixed top-14 left-[50%] translate-x-[-50%]`} />
                <ArrowRightToLine onClick={
                    () => {
                        if (!desktopRef.current) return;
                        desktopRef.current.scrollLeft = desktopRef.current.scrollWidth - desktopRef.current.clientWidth
                    }
                } className={`${contentToRight ? 'opacity-100' : 'opacity-0'} border-transparent border-[2px] hover:border-blue-500 cursor-pointer transition-all z-20 w-15 h-15 p-3 
                    text-blue-500 rounded-full bg-black/30 backdrop-blur-md fixed right-3 top-[50%] translate-y-[-100%]`} />
                <ArrowDownToLine onClick={
                    () => {
                        if (!desktopRef.current) return;
                        desktopRef.current.scrollTop = desktopRef.current.scrollHeight - desktopRef.current.clientHeight
                    }
                } className={`${contentToBottom ? 'opacity-100' : 'opacity-0'} border-transparent border-[2px] hover:border-blue-500 cursor-pointer transition-all z-20 w-15 h-15 p-3 
                    text-blue-500 rounded-full bg-black/30 backdrop-blur-md fixed bottom-14 left-[50%] translate-x-[-50%]`} />

                <div
                    ref={desktopRef} className="desktop-area flex-1 w-full relative mb-10 p-4 overflow-scroll">
                    {icons.map((icon) => (
                        <DraggableIcon
                            key={icon.id}
                            icon={icon}
                            onStart={handleDragStart}
                            onDrag={handleDrag}
                            onStop={handleDragStop}
                        />
                    ))}
                </div>

                <div className={` ${start ? 'max-h-10' : 'max-h-0'} z-100 fixed bottom-0 flex flex-row justify-center items-center gap-2 h-10 w-full backdrop-blur-md bg-black/60 overflow-hidden transition-all duration-600`}>
                    <img onClick={profile.openWindow} src="/assets/images/profile.png" alt="profile" className=" p-1.5 px-2 h-full transition-all cursor-pointer hover:bg-zinc-500/30" />
                </div>
            </div>
        </>
    );
}

