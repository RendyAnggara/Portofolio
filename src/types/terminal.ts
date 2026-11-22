export type CommandType = "help" | "about" | "projects" | "org" | "game" | "contact" | "theme" | "unknown" | "system";

export interface HistoryItem {
    id: string;
    command: string;
    type: CommandType;
    timestamp: string;
    outputText?: string;
}
