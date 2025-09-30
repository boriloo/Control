export type FileType = "folder" | "text" | "link" | "image"

type PathSegment = {
    id: string | null;
    name: string;
};

export interface FileData {
    desktopId: string;
    parentId: string | null;
    ownerId: string;
    usersId: string[];
    name: string;
    type: FileType;
    position: { x: number, y: number };
    content?: string;
    url?: string;
    imageUrl?: string;
    sizeInBytes?: number;
    path: PathSegment[];
}

