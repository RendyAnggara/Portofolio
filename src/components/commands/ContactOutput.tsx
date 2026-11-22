import { useLanguage } from "@/context/LanguageContext";
import { getPortfolioData } from "@/data/portfolioData";
import { Check, Copy, ExternalLink, FileDown, Mail, Terminal } from "lucide-react";
import { useState } from "react";

export function ContactOutput() {
    const { lang } = useLanguage();
    const { contact, profile } = getPortfolioData(lang);
    const [copied, setCopied] = useState(false);

    const copy = {
        id: {
            filePath: "~/contact.json",
            readOnly: "READ-ONLY",
            description:
                "Tertarik untuk berkolaborasi, menawarkan peluang kerja/magang, atau diskusi proyek freelance? Silakan hubungi saya melalui kanal di bawah ini:",
            copied: "Tersalin!",
            copy: "Salin",
            sendEmail: "Kirim Email",
            downloadCv: "Unduh CV",
            cvMeta: "PDF • Dokumen",
            openLabel: "Buka",
        },
        en: {
            filePath: "~/contact.json",
            readOnly: "READ-ONLY",
            description:
                "Interested in collaborating, offering a job/internship opportunity, or discussing a freelance project? Reach out through any of the channels below:",
            copied: "Copied!",
            copy: "Copy",
            sendEmail: "Send Email",
            downloadCv: "Download CV",
            cvMeta: "PDF • Resume",
            openLabel: "Open",
        },
    }[lang];

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(contact.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const githubHandle = contact.github.replace(/^https?:\/\/(www\.)?github\.com\//i, "@").replace(/\/$/, "");
    const instagramHandle = contact.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//i, "@").replace(/\/$/, "");

    return (
        <div className="my-2 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] overflow-hidden shadow-xs">
            {/* Terminal File Header Bar */}
            <div className="flex items-center justify-between gap-2 px-3.5 sm:px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-[#11161F] font-mono text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold min-w-0">
                    <Terminal className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{copy.filePath}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {profile.status}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-200/80 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {copy.readOnly}
                    </span>
                </div>
            </div>

            <div className="p-3.5 sm:p-5 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {copy.description}
                </p>

                {/* JSON-style Contact Payload */}
                <div className="w-full rounded-lg border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-[#11161F] p-3 sm:p-4 font-mono text-xs space-y-2.5">
                    <div className="text-slate-400 dark:text-slate-600 select-none">{"{"}</div>

                    {/* Row: github */}
                    <a
                        href={contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group pl-1.5 sm:pl-4 flex items-center justify-between gap-2 py-1.5 border-b border-dashed border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100/70 dark:hover:bg-slate-800/40 rounded transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                            <div className="flex items-center gap-2 shrink-0">
                                <svg
                                    className="w-3.5 h-3.5 fill-current text-slate-600 dark:text-slate-300 shrink-0"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                <span className="text-sky-600 dark:text-sky-400">&quot;github&quot;</span>
                                <span className="text-slate-400">:</span>
                            </div>
                            <span className="text-slate-700 dark:text-slate-200 break-all pl-5 sm:pl-0">
                                {githubHandle}
                            </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0">
                            <span>{copy.openLabel}</span>
                            <ExternalLink className="w-3 h-3" />
                        </span>
                    </a>

                    {/* Row: instagram */}
                    <a
                        href={contact.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group pl-1.5 sm:pl-4 flex items-center justify-between gap-2 py-1.5 border-b border-dashed border-slate-200/80 dark:border-slate-800/80 hover:bg-slate-100/70 dark:hover:bg-slate-800/40 rounded transition-colors"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                            <div className="flex items-center gap-2 shrink-0">
                                <svg className="w-3.5 h-3.5 fill-current text-pink-500 shrink-0" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                <span className="text-sky-600 dark:text-sky-400">&quot;instagram&quot;</span>
                                <span className="text-slate-400">:</span>
                            </div>
                            <span className="text-slate-700 dark:text-slate-200 break-all pl-5 sm:pl-0">
                                {instagramHandle}
                            </span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-emerald-500 transition-colors shrink-0">
                            <span>{copy.openLabel}</span>
                            <ExternalLink className="w-3 h-3" />
                        </span>
                    </a>

                    {/* Row: email */}
                    <div className="pl-1.5 sm:pl-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5 border-b border-dashed border-slate-200/80 dark:border-slate-800/80">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                            <div className="flex items-center gap-2 shrink-0">
                                <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                                <span className="text-sky-600 dark:text-sky-400">&quot;email&quot;</span>
                                <span className="text-slate-400">:</span>
                            </div>
                            <span className="text-emerald-600 dark:text-emerald-400 break-all pl-5 sm:pl-0">
                                &quot;{contact.email}&quot;
                            </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 shrink-0 pl-5 sm:pl-0">
                            <button
                                type="button"
                                onClick={handleCopyEmail}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:py-1 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-emerald-500 text-[11px] text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-3 h-3 text-emerald-500" />
                                        <span className="text-emerald-600 dark:text-emerald-400">{copy.copied}</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-3 h-3" />
                                        <span>{copy.copy}</span>
                                    </>
                                )}
                            </button>

                            <a
                                href={`mailto:${contact.email}`}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 sm:py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition-colors"
                            >
                                <span>{copy.sendEmail}</span>
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>

                    {/* Row: cv */}
                    <div className="pl-1.5 sm:pl-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-1.5">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0">
                            <div className="flex items-center gap-2 shrink-0">
                                <FileDown className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="text-sky-600 dark:text-sky-400">&quot;cv&quot;</span>
                                <span className="text-slate-400">:</span>
                            </div>
                            <span className="text-slate-500 dark:text-slate-400 break-all pl-5 sm:pl-0">
                                &quot;{contact.cvUrl}&quot;
                            </span>
                        </div>

                        <div className="pl-5 sm:pl-0 shrink-0">
                            <a
                                href={contact.cvUrl}
                                download
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:py-1 rounded-md border border-emerald-500/35 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-semibold transition-colors"
                            >
                                <FileDown className="w-3 h-3" />
                                <span>{copy.downloadCv}</span>
                                <span className="hidden sm:inline text-[10px] opacity-75">• {copy.cvMeta}</span>
                            </a>
                        </div>
                    </div>

                    <div className="text-slate-400 dark:text-slate-600 select-none">{"}"}</div>
                </div>
            </div>
        </div>
    );
}
