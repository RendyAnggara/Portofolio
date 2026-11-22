import { useLanguage } from "@/context/LanguageContext";
import { getPortfolioData } from "@/data/portfolioData";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, FolderGit2, GitBranch, Star } from "lucide-react";
import { useState } from "react";

interface ProjectsOutputProps {
    onRunCommand: (cmd: string) => void;
}

const CATEGORIES = ["All", "Full-Stack", "Mobile App", "Backend"] as const;

export function ProjectsOutput({ onRunCommand }: ProjectsOutputProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const { lang } = useLanguage();
    const { projects } = getPortfolioData(lang);

    const copy = {
        id: {
            itemsSuffix: "item",
            allCategory: "Semua",
            featured: "Unggulan",
            inDevBadge: "Segera Rilis",
            inDevFooter: "Dalam Pengembangan • Segera Hadir",
            sourceCode: "Kode Sumber",
            liveStore: "Live / Store",
            privateRepo: "Repositori Privat / Akademik",
            seeAlso: "Lihat juga:",
            orgCmd: "$ org (Galeri Organisasi)",
        },
        en: {
            itemsSuffix: "items",
            allCategory: "All",
            featured: "Featured",
            inDevBadge: "Coming Soon",
            inDevFooter: "In Development • Launching Soon",
            sourceCode: "Source Code",
            liveStore: "Live / Store",
            privateRepo: "Private / Academic Repository",
            seeAlso: "See also:",
            orgCmd: "$ org (Organization Gallery)",
        },
    }[lang];

    const filteredProjects =
        selectedCategory === "All" ? projects : projects.filter(p => p.category === selectedCategory);

    return (
        <div className="my-2 space-y-4">
            {/* Header & Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-600 dark:text-slate-300">
                    <FolderGit2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>
                        ~/projects ({filteredProjects.length} {copy.itemsSuffix})
                    </span>
                </div>

                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-2.5 py-1.5 sm:py-1 rounded transition-colors cursor-pointer ${
                                selectedCategory === cat
                                    ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/30"
                                    : "bg-slate-100 dark:bg-slate-800/70 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                            }`}
                        >
                            {cat === "All" ? copy.allCategory : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Kartu Proyek dengan Efek Snap / Tiling Pop */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.14 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3.5"
                >
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.98, y: 6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                duration: 0.2,
                                delay: idx * 0.05,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="flex flex-col justify-between p-3.5 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] hover:border-emerald-500/50 transition-colors"
                        >
                            <div className="space-y-2.5">
                                {/* Top Row: Category & Status Badges */}
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <span className="px-2 py-0.5 rounded font-mono text-[11px] bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                                        {project.category}
                                    </span>

                                    <div className="flex flex-wrap items-center gap-2">
                                        {project.inDevelopment && (
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded font-mono text-[11px] bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25">
                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                                {copy.inDevBadge}
                                            </span>
                                        )}
                                        {project.featured && (
                                            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-amber-500">
                                                <Star className="w-3 h-3 fill-amber-500" />
                                                {copy.featured}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Title & Description */}
                                <div>
                                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-snug">
                                        {project.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Row: Tech Stack & Links */}
                            <div className="pt-3.5 sm:pt-4 mt-3.5 sm:mt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                                <div className="flex flex-wrap gap-1.5">
                                    {project.techStack.map(tech => (
                                        <span
                                            key={tech}
                                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 py-0.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                                        >
                                            <GitBranch className="w-3.5 h-3.5" />
                                            <span>{copy.sourceCode}</span>
                                        </a>
                                    )}
                                    {project.demoUrl && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 py-0.5 text-emerald-600 dark:text-emerald-400 hover:underline"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            <span>{copy.liveStore}</span>
                                        </a>
                                    )}
                                    {!project.githubUrl && !project.demoUrl && (
                                        <span className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                                            {project.inDevelopment ? copy.inDevFooter : copy.privateRepo}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Navigasi Lanjutan */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                <span>{copy.seeAlso}</span>
                <button
                    onClick={() => onRunCommand("org")}
                    className="px-2.5 py-1 sm:py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 cursor-pointer"
                >
                    {copy.orgCmd}
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
