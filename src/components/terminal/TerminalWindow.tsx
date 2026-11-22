import { useLanguage } from "@/context/LanguageContext";
import { CommandType, HistoryItem } from "@/types/terminal";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, GitBranch, Info, Moon, Sun, Terminal as TerminalIcon, Trash2, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { AboutOutput } from "../commands/AboutOutput";
import { ContactOutput } from "../commands/ContactOutput";
import { GuessGameOutput } from "../commands/GuessGameOutput";
import { GuideOutput } from "../commands/GuideOutput";
import { OrgGalleryOutput } from "../commands/OrgGalleryOutput";
import { ProjectsOutput } from "../commands/ProjectsOutput";
import { PacmanLoader } from "./PacmanLoader";
import { SplashScreen } from "./SplashScreen";
import { TerminalInput } from "./TerminalInput";

const QUICK_MENU = [
    { label: "help", cmd: "help" },
    { label: "about", cmd: "about" },
    { label: "projects", cmd: "projects" },
    { label: "org-gallery", cmd: "org" },
    { label: "mini-game", cmd: "game" },
    { label: "contact", cmd: "contact" },
];

function resolveLocalizedMessage(raw: string | undefined, lang: "id" | "en"): string {
    if (!raw) return "";

    if (raw === "__SYS__:sudo") {
        return lang === "id"
            ? "Akses ditolak: pengunjung tidak terdaftar di berkas sudoers. Insiden ini akan dilaporkan ke Rendy."
            : "Permission denied: visitor is not in the sudoers file. This incident will be reported to Rendy.";
    }

    if (raw === "__SYS__:lang-id") {
        return lang === "id"
            ? "Bahasa berhasil diubah ke Bahasa Indonesia (ID)."
            : "Language switched to Indonesian (ID).";
    }

    if (raw === "__SYS__:lang-en") {
        return lang === "id" ? "Bahasa berhasil diubah ke Bahasa Inggris (EN)." : "Language switched to English (EN).";
    }

    if (raw.startsWith("__THEME__:")) {
        const mode = raw.replace("__THEME__:", "").toUpperCase();
        return lang === "id" ? `Tema berhasil diubah ke mode ${mode}.` : `Theme switched to ${mode} mode.`;
    }

    return raw;
}

function CommandOutputWithPacman({ item, onRunCommand }: { item: HistoryItem; onRunCommand: (cmd: string) => void }) {
    const { lang } = useLanguage();

    const skipPacman =
        item.id === "init-guide" || item.type === "theme" || item.type === "system" || item.type === "unknown";

    const [done, setDone] = useState(skipPacman);

    if (!done) {
        return <PacmanLoader label={`pacman -S ${item.type}`} durationMs={900} onComplete={() => setDone(true)} />;
    }

    const isWindowTile = item.type === "projects" || item.type === "org";

    return (
        <motion.div
            initial={isWindowTile ? { opacity: 0, scale: 0.985, y: 4 } : { opacity: 0, x: -10 }}
            animate={isWindowTile ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, x: 0 }}
            transition={{
                duration: isWindowTile ? 0.22 : 0.18,
                ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full"
        >
            {(() => {
                switch (item.type) {
                    case "help":
                        return <GuideOutput onRunCommand={onRunCommand} />;
                    case "about":
                        return <AboutOutput onRunCommand={onRunCommand} />;
                    case "projects":
                        return <ProjectsOutput onRunCommand={onRunCommand} />;
                    case "org":
                        return <OrgGalleryOutput onRunCommand={onRunCommand} />;
                    case "game":
                        return <GuessGameOutput />;
                    case "contact":
                        return <ContactOutput />;
                    case "theme":
                        return (
                            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 py-1">
                                [SYSTEM]: {resolveLocalizedMessage(item.outputText, lang)}
                            </div>
                        );
                    case "system":
                        return (
                            <pre className="text-xs font-mono text-amber-600 dark:text-amber-400 whitespace-pre-wrap py-1">
                                {resolveLocalizedMessage(item.outputText, lang)}
                            </pre>
                        );
                    default:
                        return (
                            <div className="text-xs font-mono text-rose-500 dark:text-rose-400 py-1">
                                {lang === "id" ? (
                                    <>
                                        Perintah tidak ditemukan: &quot;{item.command}&quot;. Ketik{" "}
                                        <button
                                            onClick={() => onRunCommand("help")}
                                            className="underline font-semibold cursor-pointer"
                                        >
                                            help
                                        </button>{" "}
                                        untuk melihat daftar perintah.
                                    </>
                                ) : (
                                    <>
                                        Command not found: &quot;{item.command}&quot;. Type{" "}
                                        <button
                                            onClick={() => onRunCommand("help")}
                                            className="underline font-semibold cursor-pointer"
                                        >
                                            help
                                        </button>{" "}
                                        to see available commands.
                                    </>
                                )}
                            </div>
                        );
                }
            })()}
        </motion.div>
    );
}

export function TerminalWindow() {
    const { theme, setTheme } = useTheme();
    const { lang, setLang, toggleLang } = useLanguage();
    const [showSplash, setShowSplash] = useState(true);
    const [showDeviceNote, setShowDeviceNote] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("help");
    const [history, setHistory] = useState<HistoryItem[]>(() => [
        {
            id: "init-guide",
            command: "help",
            type: "help",
            timestamp: "--:--",
        },
    ]);
    const [rawCommands, setRawCommands] = useState<string[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const noteCopy = {
        id: {
            badge: "CATATAN TAMPILAN",
            message:
                "Situs ini dirancang dengan pengalaman terminal/CLI dan tata letak multi kolom lebih nyaman dan optimal dibuka lewat laptop/desktop dibandingkan HP.",
            dismiss: "Tutup",
        },
        en: {
            badge: "DISPLAY NOTE",
            message:
                "This site features a terminal/CLI experience and multi column layouts it is best viewed on a laptop/desktop rather than a phone.",
            dismiss: "Dismiss",
        },
    }[lang];

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
            setHistory(prev =>
                prev.map(item =>
                    item.id === "init-guide"
                        ? {
                              ...item,
                              timestamp: new Date().toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                              }),
                          }
                        : item,
                ),
            );
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Saat awal buka / hanya berisi init-guide, biarkan scroll tetap di paling atas
        if (history.length <= 1 && history[0]?.id === "init-guide") {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = 0;
            }
            return;
        }

        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    const handleCommand = (rawInput: string) => {
        const trimmed = rawInput.trim();
        if (!trimmed) return;

        setRawCommands(prev => [...prev, trimmed]);
        const lower = trimmed.toLowerCase();

        // Perintah Clear
        if (lower === "clear" || lower === "cls") {
            setHistory([]);
            setActiveSection("idle");
            return;
        }

        // Perintah Language (ID / EN)
        if (lower === "lang" || lower === "lang id" || lower === "lang en" || lower === "bahasa") {
            const nextLang = lower === "lang id" ? "id" : lower === "lang en" ? "en" : lang === "id" ? "en" : "id";
            setLang(nextLang);
            setHistory(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    command: trimmed,
                    type: "theme",
                    outputText: nextLang === "id" ? "__SYS__:lang-id" : "__SYS__:lang-en",
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);
            return;
        }

        // Perintah Theme
        if (lower === "theme") {
            setTheme(theme === "dark" ? "light" : "dark");
        } else if (lower === "dark") {
            setTheme("dark");
        } else if (lower === "light") {
            setTheme("light");
        }

        if (["theme", "dark", "light"].includes(lower)) {
            const nextTheme = lower === "theme" ? (theme === "dark" ? "light" : "dark") : lower;
            setHistory(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    command: trimmed,
                    type: "theme",
                    outputText: `__THEME__:${nextTheme}`,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);
            return;
        }

        // Perintah Easter Egg & Linux Utilities
        if (lower.startsWith("sudo") || lower.includes("rm -rf")) {
            setHistory(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    command: trimmed,
                    type: "system",
                    outputText: "__SYS__:sudo",
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);
            return;
        }

        if (lower === "history") {
            const list = [...rawCommands, trimmed].map((cmd, i) => `  ${i + 1}  ${cmd}`).join("\n");
            setHistory(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    command: trimmed,
                    type: "system",
                    outputText: list,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);
            return;
        }

        if (lower === "date") {
            setHistory(prev => [
                ...prev,
                {
                    id: Date.now().toString(),
                    command: trimmed,
                    type: "system",
                    outputText: new Date().toString(),
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);
            return;
        }

        // Pemetaan Perintah Utama
        let type: CommandType = "unknown";
        if (["help", "guide", "?", "neofetch", "fastfetch"].includes(lower)) type = "help";
        else if (["about", "whoami"].includes(lower)) type = "about";
        else if (["projects", "ls projects", "project"].includes(lower)) type = "projects";
        else if (["org", "gallery", "experience", "organisasi"].includes(lower)) type = "org";
        else if (["game", "play guess", "play", "guess"].includes(lower)) type = "game";
        else if (["contact", "socials", "kontak"].includes(lower)) type = "contact";

        if (type !== "unknown") {
            setActiveSection(type);
        }

        setHistory(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                command: trimmed,
                type,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            },
        ]);
    };

    const renderOutput = (item: HistoryItem) => {
        return <CommandOutputWithPacman item={item} onRunCommand={handleCommand} />;
    };

    return (
        <>
            {showSplash && <SplashScreen durationMs={1350} onFinish={() => setShowSplash(false)} />}
            <div className="w-full h-dvh flex flex-col bg-slate-50 dark:bg-[#0B0F17] bg-dot-grid overflow-hidden transition-colors duration-300">
                {/* Top Window Header Bar */}
                <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 px-3 sm:px-4 py-2 border-b border-slate-200 dark:border-slate-800/90 bg-white/90 dark:bg-[#11161F]/95 backdrop-blur-md select-none z-10">
                    {/* Baris Atas: Traffic Lights + Session Path + Action Controls */}
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                            <div className="flex items-center gap-1.5 shrink-0">
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/90" />
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400/90" />
                                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/90" />
                            </div>
                            <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                                <TerminalIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="truncate">rendy@portfolio: ~/{activeSection}</span>
                            </div>
                        </div>

                        {/* Utility Controls (Clear, Lang, Theme) */}
                        <div className="flex items-center gap-1 shrink-0 md:hidden">
                            <button
                                onClick={() => handleCommand("clear")}
                                title={lang === "id" ? "Bersihkan Terminal (clear)" : "Clear Terminal (clear)"}
                                className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            {mounted && (
                                <button
                                    onClick={toggleLang}
                                    aria-label="Switch Language"
                                    title={
                                        lang === "id"
                                            ? "Ganti ke Bahasa Inggris (lang en)"
                                            : "Switch to Indonesian (lang id)"
                                    }
                                    className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer uppercase"
                                >
                                    {lang}
                                </button>
                            )}

                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    aria-label="Toggle Theme"
                                    title={lang === "id" ? "Ubah Tema (Dark / Light)" : "Toggle Theme (Dark / Light)"}
                                    className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer"
                                >
                                    {theme === "dark" ? (
                                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                                    ) : (
                                        <Moon className="w-3.5 h-3.5 text-slate-700" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Menu Navigasi Cepat + Desktop Utility Controls */}
                    <div className="flex items-center justify-between md:justify-end gap-1 overflow-x-auto max-w-full py-0.5">
                        <div className="flex items-center gap-1">
                            {QUICK_MENU.map(item => {
                                const isActive = activeSection === item.cmd;
                                return (
                                    <button
                                        key={item.cmd}
                                        onClick={() => handleCommand(item.cmd)}
                                        className={`px-2 sm:px-2.5 py-1 rounded-md font-mono text-[11px] sm:text-xs transition-all cursor-pointer shrink-0 ${
                                            isActive
                                                ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200 border border-transparent"
                                        }`}
                                    >
                                        [{item.label}]
                                    </button>
                                );
                            })}
                        </div>

                        <div className="hidden md:flex items-center gap-1 shrink-0">
                            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

                            <button
                                onClick={() => handleCommand("clear")}
                                title={lang === "id" ? "Bersihkan Terminal (clear)" : "Clear Terminal (clear)"}
                                className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors cursor-pointer shrink-0"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>

                            {mounted && (
                                <button
                                    onClick={toggleLang}
                                    aria-label="Switch Language"
                                    title={
                                        lang === "id"
                                            ? "Ganti ke Bahasa Inggris (lang en)"
                                            : "Switch to Indonesian (lang id)"
                                    }
                                    className="px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer shrink-0 uppercase"
                                >
                                    {lang}
                                </button>
                            )}

                            {mounted && (
                                <button
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    aria-label="Toggle Theme"
                                    title={lang === "id" ? "Ubah Tema (Dark / Light)" : "Toggle Theme (Dark / Light)"}
                                    className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-emerald-500 transition-colors cursor-pointer shrink-0"
                                >
                                    {theme === "dark" ? (
                                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                                    ) : (
                                        <Moon className="w-3.5 h-3.5 text-slate-700" />
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                {/* Main Scrollable Terminal Body (Left-Aligned Container) */}
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6">
                    <div className="max-w-full w-full text-left space-y-5 sm:space-y-6">
                        {/* Startup Note: Rekomendasi Laptop vs HP */}
                        <AnimatePresence initial={false}>
                            {showDeviceNote && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-start justify-between gap-2.5 px-3 sm:px-3.5 py-2.5 rounded-lg border border-amber-500/30 bg-amber-500/10 dark:bg-amber-500/10 text-amber-800 dark:text-amber-300 font-mono text-[11px] sm:text-xs"
                                >
                                    <div className="flex items-start gap-2 leading-relaxed min-w-0">
                                        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                        <div>
                                            <span className="font-bold mr-1.5">[{noteCopy.badge}]</span>
                                            <span>{noteCopy.message}</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowDeviceNote(false)}
                                        aria-label={noteCopy.dismiss}
                                        title={noteCopy.dismiss}
                                        className="p-1 rounded hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 transition-colors cursor-pointer shrink-0"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence initial={false}>
                            {history.map(item => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.22 }}
                                    className="space-y-2.5"
                                >
                                    {/* Prompt Line */}
                                    <div className="flex items-center justify-between gap-2 font-mono text-xs border-b border-dashed border-slate-200/80 dark:border-slate-800/80 pb-1.5">
                                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                                            <span className="text-emerald-600 dark:text-emerald-400 font-semibold shrink-0">
                                                visitor@portfolio:~$
                                            </span>
                                            <span className="text-slate-800 dark:text-slate-100 font-medium truncate">
                                                {item.command}
                                            </span>
                                        </div>
                                        <span className="text-[11px] text-slate-400 dark:text-slate-600 shrink-0">
                                            {item.timestamp}
                                        </span>
                                    </div>

                                    {/* Output Body */}
                                    <div className="text-left w-full">{renderOutput(item)}</div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Active Command Line Input */}
                        <div className="pt-1 pb-6 w-full text-left">
                            <TerminalInput onSubmit={handleCommand} commandHistory={rawCommands} />
                        </div>

                        <div ref={bottomRef} />
                    </div>
                </div>

                {/* Bottom Tmux / Neovim Style Status Bar */}
                <footer className="px-3 sm:px-4 pt-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#11161F] font-mono text-[10px] sm:text-[11px] flex items-center justify-between gap-2 text-slate-500 dark:text-slate-400 select-none">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                        <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold tracking-wider text-[10px] shrink-0">
                            {activeSection === "game" ? "GAME" : "NORMAL"}
                        </span>
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300 shrink-0">
                            <GitBranch className="w-3 h-3 text-emerald-500" />
                            <span>main*</span>
                        </span>
                        <span className="hidden sm:inline text-slate-400 dark:text-slate-600">|</span>
                        <span className="hidden sm:inline truncate">~/portfolio/{activeSection}</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        <span className="uppercase text-slate-500 dark:text-slate-400 font-semibold">
                            {mounted ? lang : "id"}
                        </span>
                        <span className="hidden md:flex items-center gap-1">
                            <Cpu className="w-3 h-3 text-sky-500" />
                            <span>UTF-8</span>
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">● Ready</span>
                    </div>
                </footer>
            </div>
        </>
    );
}
