import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

type ClickableImageInputProps = {
    currentImageUrl?: string;
    onFileSelected: (file: File) => void;
};

export function ClickableImageInput({ onFileSelected, currentImageUrl }: ClickableImageInputProps) {
    const [preview, setPreview] = useState<string | null>(currentImageUrl || null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setPreview(URL.createObjectURL(file));
            onFileSelected(file);
        }
    }, [onFileSelected]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': [],
        },
        multiple: false,
        noDrag: true,
    });

    useEffect(() => {
        return () => {
            if (preview && !currentImageUrl) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview, currentImageUrl]);

    return (
        <div
            {...getRootProps()}
            className="relative rounded-sm  overflow-hidden cursor-pointer group bg-zinc-700 border-2 transition p-2 px-4 border-zinc-500 hover:bg-zinc-800"
        >
            <input {...getInputProps()} />

            {preview ? (
                <>
                    <img src={preview} alt="Pré-visualização" className="group relative w-full max-w-[200px] h-full object-cover" />
                    <div className="absolute top-0 left-0 z-10 w-full h-full flex justify-center items-center font-medium text-lg transition-all 
                    opacity-0 bg-black/50 group-hover:opacity-100 backdrop-blur-sm object-cover">
                        Escolher outra imagem
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center  gap-2">
                    Selecionar Imagem
                    <Upload className="w-6 h-6 text-zinc-400" />
                </div>
            )}


        </div>
    );
}
