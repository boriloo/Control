export type DesktopType = "personal" | "team"

export interface DesktopData {
    name: string;
    type: DesktopType;
    ownerId: string;
    members: string[];
    background?: string;
}
