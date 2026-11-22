import { useLanguage } from "@/context/LanguageContext";
import { getPortfolioData } from "@/data/portfolioData";
import { Briefcase, Cpu, GraduationCap, MapPin, User } from "lucide-react";

interface AboutOutputProps {
    onRunCommand: (cmd: string) => void;
}

export function AboutOutput({ onRunCommand }: AboutOutputProps) {
    const { lang } = useLanguage();
    const { profile, skills } = getPortfolioData(lang);

    const copy = {
        id: {
            envPrefix: "Env:",
            techTitle: "TECH STACK & TOOLS",
            exploreMore: "Lanjut jelajahi:",
        },
        en: {
            envPrefix: "Env:",
            techTitle: "TECH STACK & TOOLS",
            exploreMore: "Explore next:",
        },
    }[lang];

    return (
        <div className="my-2 space-y-4 w-full min-w-0">
            {/* Kartu Utama ala System Fetch */}
            <div className="p-3.5 sm:p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 min-w-0">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-5 min-w-0">
                    {/* Kolom Kiri: ASCII / Badge Identitas */}
                    <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-3.5 md:gap-0 p-3.5 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] shrink-0 md:w-56 text-left md:text-center min-w-0">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-mono text-lg sm:text-xl font-bold md:mb-3 shrink-0">
                            &gt;_
                        </div>
                        <div className="min-w-0">
                            <div className="font-mono text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                                {profile.nickname}@dev
                            </div>
                            <div className="mt-1 sm:mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 max-w-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                <span className="truncate">{profile.status}</span>
                            </div>
                        </div>
                    </div>

                    {/* Kolom Kanan: Info Detail */}
                    <div className="flex-1 space-y-3 min-w-0">
                        <div className="min-w-0">
                            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug break-words">
                                {profile.name}
                            </h2>
                            <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 break-words">
                                {profile.role}
                            </p>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line break-words">
                            {profile.bio}
                        </p>

                        {/* Metadata Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2.5 border-t border-slate-200 dark:border-slate-800 text-xs min-w-0">
                            <div className="flex items-start sm:items-center gap-2 text-slate-600 dark:text-slate-400 min-w-0">
                                <GraduationCap className="w-4 h-4 text-sky-500 shrink-0 mt-0.5 sm:mt-0" />
                                <span className="break-words min-w-0">{profile.university}</span>
                            </div>
                            <div className="flex items-start sm:items-center gap-2 text-slate-600 dark:text-slate-400 min-w-0">
                                <Briefcase className="w-4 h-4 text-amber-500 shrink-0 mt-0.5 sm:mt-0" />
                                <span className="break-words min-w-0">{profile.major}</span>
                            </div>
                            <div className="flex items-start sm:items-center gap-2 text-slate-600 dark:text-slate-400 min-w-0">
                                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5 sm:mt-0" />
                                <span className="break-words min-w-0">{profile.location}</span>
                            </div>
                            <div className="flex items-start sm:items-center gap-2 text-slate-600 dark:text-slate-400 min-w-0">
                                <Cpu className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 sm:mt-0" />
                                <span className="break-words min-w-0">
                                    {copy.envPrefix} {profile.os}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack Section */}
            <div className="p-3.5 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] space-y-3 min-w-0">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <User className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{copy.techTitle}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 min-w-0">
                    {Object.entries(skills).map(([category, items]) => (
                        <div
                            key={category}
                            className="p-3 rounded-md border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 min-w-0"
                        >
                            <div className="font-mono text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase break-words">
                                ./{category}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {items.map(skill => (
                                    <span
                                        key={skill}
                                        className="px-2 py-0.5 rounded text-[11px] sm:text-xs font-mono bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-200 break-words"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigasi Lanjutan */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>{copy.exploreMore}</span>
                <button
                    onClick={() => onRunCommand("projects")}
                    className="px-2.5 py-1 sm:py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 cursor-pointer"
                >
                    $ projects
                </button>
                <button
                    onClick={() => onRunCommand("org")}
                    className="px-2.5 py-1 sm:py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 cursor-pointer"
                >
                    $ org
                </button>
                <button
                    onClick={() => onRunCommand("contact")}
                    className="px-2.5 py-1 sm:py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 cursor-pointer"
                >
                    $ contact
                </button>
            </div>
        </div>
    );
}
