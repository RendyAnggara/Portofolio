import { useLanguage } from "@/context/LanguageContext";
import { getPortfolioData } from "@/data/portfolioData";
import { ArrowRight, Briefcase, CircleDot, Code2, GraduationCap, Layers, Sparkles, Terminal, User } from "lucide-react";
import { TerminalAvatar } from "../terminal/TerminalAvatar";

interface GuideOutputProps {
    onRunCommand: (cmd: string) => void;
}

// prettier-ignore
const ASCII_BANNER = `
 ██████╗ ███████╗███╗   ██╗██████╗ ██╗   ██╗
 ██╔══██╗██╔════╝████╗  ██║██╔══██╗╚██╗ ██╔╝
 ██████╔╝█████╗  ██╔██╗ ██║██║  ██║ ╚████╔╝ 
 ██╔══██╗██╔══╝  ██║╚██╗██║██║  ██║  ╚██╔╝  
 ██║  ██║███████╗██║ ╚████║██████╔╝   ██║   
 ╚═╝  ╚═╝╚══════╝╚═╝  ╚═══╝╚═════╝    ╚═╝   
`;

const COMMAND_LIST = {
    id: [
        {
            cmd: "about",
            alias: "whoami, fastfetch",
            desc: "Profil lengkap, pendidikan, dan tech stack utama.",
        },
        {
            cmd: "projects",
            alias: "ls projects",
            desc: "Katalog proyek web & mobile beserta source code.",
        },
        {
            cmd: "org",
            alias: "gallery",
            desc: "Galeri dokumentasi & pengalaman organisasi kuliah.",
        },
        {
            cmd: "game",
            alias: "play guess",
            desc: "Mini game interaktif: Tebak Angka (1 - 100).",
        },
        {
            cmd: "contact",
            alias: "socials",
            desc: "Email, sosial media, dan unduh CV (PDF).",
        },
        {
            cmd: "clear",
            alias: "cls",
            desc: "Bersihkan riwayat layar terminal.",
        },
    ],
    en: [
        {
            cmd: "about",
            alias: "whoami, fastfetch",
            desc: "Full profile, education background, and core tech stack.",
        },
        {
            cmd: "projects",
            alias: "ls projects",
            desc: "Web & mobile project catalog with source code.",
        },
        {
            cmd: "org",
            alias: "gallery",
            desc: "Campus organization experience & documentation gallery.",
        },
        {
            cmd: "game",
            alias: "play guess",
            desc: "Interactive mini game: Guess the Number (1 - 100).",
        },
        {
            cmd: "contact",
            alias: "socials",
            desc: "Email, social links, and downloadable resume (PDF).",
        },
        {
            cmd: "clear",
            alias: "cls",
            desc: "Clear terminal screen history.",
        },
    ],
};

export function GuideOutput({ onRunCommand }: GuideOutputProps) {
    const { lang } = useLanguage();
    const { profile } = getPortfolioData(lang);

    const copy = {
        id: {
            welcome:
                "Selamat datang di terminal interaktif saya. Ketik perintah di bawah atau klik menu cepat di bar atas untuk menjelajahi proyek, galeri organisasi, hingga mencoba mini game.",
            clickMode: "[Mode Klik]",
            clickDesc: "Klik tab menu di bar atas atau klik langsung nama perintah pada daftar di bawah.",
            cliMode: "[Mode CLI]",
            cliPrefix: "Ketik perintah +",
            cliMid: ". Gunakan",
            cliTab: "untuk autocomplete &",
            cliHistory: "untuk riwayat.",
            clickToRun: "Klik untuk eksekusi",
        },
        en: {
            welcome:
                "Welcome to my interactive portfolio terminal. Type a command below or click the quick tabs in the top bar to explore projects, organization gallery, or play a mini game.",
            clickMode: "[Click Mode]",
            clickDesc: "Click any tab in the top bar or click directly on a command row below.",
            cliMode: "[CLI Mode]",
            cliPrefix: "Type a command +",
            cliMid: ". Use",
            cliTab: "to autocomplete &",
            cliHistory: "for history.",
            clickToRun: "Click to run",
        },
    }[lang];

    const commands = COMMAND_LIST[lang];

    return (
        <div className="space-y-4 sm:space-y-5 my-2 w-full min-w-0">
            {/* Fastfetch Style Header: ASCII + Foto Ilustrasi di Kiri, System Specs di Kanan */}
            <div className="py-1 sm:py-2 flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-8 min-w-0">
                {/* Kolom Kiri: ASCII RENDY + Foto Ilustrasi di Bawahnya */}
                <div className="flex flex-col items-center gap-2.5 sm:gap-3 shrink-0 max-w-full min-w-0">
                    <pre className="font-mono text-[6px] sm:text-[9px] leading-[1.15] text-emerald-600 dark:text-emerald-400 select-none overflow-x-auto max-w-full">
                        {ASCII_BANNER}
                    </pre>

                    {/* Avatar Pixel-Matrix Tanpa Background (Menyatu Dark & Light) */}
                    <div className="pt-0.5 sm:pt-1">
                        <TerminalAvatar src="/images/org/avatar.jpg" size={190} />
                    </div>
                </div>

                {/* Kolom Kanan: Info Profil Gaya Fastfetch */}
                <div className="flex-1 font-mono text-xs sm:text-[13px] space-y-2.5 w-full min-w-0">
                    {/* Title: rendy on portfolio */}
                    <div className="font-bold text-sm sm:text-base pb-1 text-center md:text-left">
                        <span className="text-emerald-600 dark:text-emerald-400">rendy</span>
                        <span className="text-slate-400 dark:text-slate-500"> on </span>
                        <span className="text-sky-600 dark:text-sky-400">portfolio</span>
                    </div>

                    {/* Key-Value Rows */}
                    <div className="space-y-1.5 w-full min-w-0">
                        <div className="flex items-start justify-start gap-2.5 sm:gap-3 w-full min-w-0">
                            <span className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 w-20 sm:w-24 shrink-0 justify-start">
                                <User className="w-3.5 h-3.5 shrink-0" />
                                <span>name</span>
                            </span>
                            <span className="text-sky-600 dark:text-sky-400 font-semibold break-words min-w-0">
                                {profile.name}
                            </span>
                        </div>

                        <div className="flex items-start justify-start gap-2.5 sm:gap-3 w-full min-w-0">
                            <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 w-20 sm:w-24 shrink-0 justify-start">
                                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                                <span>role</span>
                            </span>
                            <span className="text-amber-600 dark:text-amber-400 break-words min-w-0">
                                {profile.role}
                            </span>
                        </div>

                        <div className="flex items-start justify-start gap-2.5 sm:gap-3 w-full min-w-0">
                            <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 w-20 sm:w-24 shrink-0 justify-start">
                                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                                <span>edu</span>
                            </span>
                            <span className="text-purple-600 dark:text-purple-400 break-words min-w-0">
                                {profile.university} ({profile.major})
                            </span>
                        </div>

                        <div className="flex items-start justify-start gap-2.5 sm:gap-3 w-full min-w-0">
                            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 w-20 sm:w-24 shrink-0 justify-start">
                                <CircleDot className="w-3.5 h-3.5 shrink-0" />
                                <span>status</span>
                            </span>
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium break-words min-w-0">
                                {profile.status}
                            </span>
                        </div>

                        <div className="flex items-start justify-start gap-2.5 sm:gap-3 pt-1 w-full min-w-0">
                            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 w-20 sm:w-24 shrink-0 justify-start">
                                <Layers className="w-3.5 h-3.5 shrink-0" />
                                <span>stack</span>
                            </span>
                            <span className="text-rose-600 dark:text-rose-400 break-words min-w-0">
                                React, Next.js, Laravel, Ionic, Go, MySQL
                            </span>
                        </div>

                        <div className="flex items-start justify-start gap-2.5 sm:gap-3 w-full min-w-0">
                            <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400 w-20 sm:w-24 shrink-0 justify-start">
                                <Code2 className="w-3.5 h-3.5 shrink-0" />
                                <span>editor & os</span>
                            </span>
                            <span className="text-cyan-600 dark:text-cyan-400 break-words min-w-0">
                                {profile.editor} & {profile.os}
                            </span>
                        </div>
                    </div>

                    {/* Terminal Color Dots ala Fastfetch */}
                    <div className="flex items-center gap-2 pt-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-600" />
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
                    </div>

                    {/* Sambutan Singkat */}
                    <p className="font-sans text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1 break-words">
                        {copy.welcome}
                    </p>
                </div>
            </div>

            {/* Terminal Style Usage Note */}
            <div className="px-3.5 sm:px-4 py-3 rounded-lg border-l-2 border-emerald-500 bg-slate-100/70 dark:bg-[#0D1117]/90 font-mono text-[11px] sm:text-xs space-y-1.5 text-slate-600 dark:text-slate-400 min-w-0">
                <div className="text-slate-800 dark:text-slate-200 font-semibold"># QUICK USAGE GUIDE</div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 shrink-0">{copy.clickMode}</span>
                    <span>{copy.clickDesc}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                    <span className="text-sky-600 dark:text-sky-400 shrink-0">{copy.cliMode}</span>
                    <span className="leading-relaxed">
                        {copy.cliPrefix}{" "}
                        <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[10px]">
                            Enter
                        </kbd>
                        {copy.cliMid}{" "}
                        <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[10px]">
                            Tab
                        </kbd>{" "}
                        {copy.cliTab}{" "}
                        <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[10px]">
                            ↑/↓
                        </kbd>{" "}
                        {copy.cliHistory}
                    </span>
                </div>
            </div>

            {/* Command Directory Table */}
            <div className="rounded-xl border border-slate-200/90 dark:border-slate-800 overflow-hidden shadow-sm min-w-0">
                <div className="px-3.5 sm:px-4 py-2.5 bg-slate-100/90 dark:bg-[#161B22] border-b border-slate-200 dark:border-slate-800 flex items-center justify-between font-mono text-xs">
                    <span className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                        <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                        <span>AVAILABLE COMMANDS</span>
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 hidden sm:flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>{copy.clickToRun}</span>
                    </span>
                </div>

                <div className="divide-y divide-slate-200/80 dark:divide-slate-800/80 bg-white/90 dark:bg-[#0D1117]/95">
                    {commands.map(item => (
                        <button
                            key={item.cmd}
                            type="button"
                            onClick={() => onRunCommand(item.cmd)}
                            className="w-full text-left flex flex-col sm:flex-row sm:items-center justify-between px-3.5 sm:px-4 py-3 sm:py-2.5 gap-1.5 sm:gap-4 hover:bg-emerald-500/[0.04] dark:hover:bg-emerald-500/[0.06] group transition-colors cursor-pointer"
                        >
                            <div className="flex flex-wrap items-center gap-2 font-mono text-xs shrink-0">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white font-semibold transition-colors">
                                    $ {item.cmd}
                                </span>
                                <span className="text-slate-400 dark:text-slate-500 text-[11px]">({item.alias})</span>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 flex-1 min-w-0">
                                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                                    {item.desc}
                                </p>
                                <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-700 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0 hidden sm:block" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
