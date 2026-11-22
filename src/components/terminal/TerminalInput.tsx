import { useLanguage } from "@/context/LanguageContext";
import React, { useEffect, useRef, useState } from "react";

interface TerminalInputProps {
    onSubmit: (command: string) => void;
    commandHistory: string[];
    promptLabel?: string;
    placeholder?: string;
}

const AVAILABLE_COMMANDS = [
    "help",
    "guide",
    "about",
    "whoami",
    "neofetch",
    "fastfetch",
    "projects",
    "org",
    "gallery",
    "game",
    "play guess",
    "contact",
    "lang",
    "lang id",
    "lang en",
    "bahasa",
    "theme",
    "dark",
    "light",
    "history",
    "date",
    "clear",
];

export function TerminalInput({
    onSubmit,
    commandHistory,
    promptLabel = "visitor@portfolio:~$",
    placeholder,
}: TerminalInputProps) {
    const { lang } = useLanguage();
    const [input, setInput] = useState("");
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    const resolvedPlaceholder =
        placeholder ??
        (lang === "id" ? "Ketik 'help' atau pilih menu di atas..." : "Type 'help' or select a menu above...");

    useEffect(() => {
        // Hindari auto-focus di layar touch/HP agar keyboard virtual tidak langsung muncul saat baru buka halaman
        if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
            inputRef.current?.focus();
        }
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit(input);
            setInput("");
            setHistoryIndex(-1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length === 0) return;
            const nextIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
            setHistoryIndex(nextIndex);
            setInput(commandHistory[commandHistory.length - 1 - nextIndex] || "");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIndex = historyIndex - 1;
                setHistoryIndex(nextIndex);
                setInput(commandHistory[commandHistory.length - 1 - nextIndex] || "");
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const trimmed = input.trim().toLowerCase();
            if (!trimmed) return;
            const match = AVAILABLE_COMMANDS.find(cmd => cmd.startsWith(trimmed));
            if (match) {
                setInput(match);
            }
        }
    };

    return (
        <div
            onClick={() => inputRef.current?.focus()}
            className="flex items-center gap-1.5 sm:gap-2 font-mono py-2 cursor-text"
        >
            <span className="text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-semibold shrink-0 select-none">
                {promptLabel}
            </span>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={resolvedPlaceholder}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                enterKeyHint="send"
                spellCheck="false"
                className="min-w-0 flex-1 bg-transparent outline-none text-base sm:text-sm text-slate-800 dark:text-slate-100 placeholder:text-xs sm:placeholder:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600"
            />
        </div>
    );
}
