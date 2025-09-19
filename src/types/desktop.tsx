type Desktop = "personal" | "team"

export interface DesktopData {
    name: string;
    type: Desktop;
    ownerId: string;
    members: string[];
    background?: string;
}
