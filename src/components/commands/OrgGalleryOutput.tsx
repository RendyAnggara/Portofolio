import { useLanguage } from "@/context/LanguageContext";
import { getPortfolioData, OrgExperienceItem } from "@/data/portfolioData";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, CheckCircle2, Image as ImageIcon, MapPin, Maximize2, Users, X } from "lucide-react";
import { useState } from "react";

interface OrgGalleryOutputProps {
    onRunCommand: (cmd: string) => void;
}

interface OrgPhotoSliderProps {
    org: OrgExperienceItem;
    fullViewLabel: string;
    brokenImages: Record<string, boolean>;
    onImageError: (key: string) => void;
    onOpenLightbox: (data: { url: string; caption: string; orgName: string }) => void;
}

function OrgPhotoSlider({ org, fullViewLabel, brokenImages, onImageError, onOpenLightbox }: OrgPhotoSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const totalPhotos = org.photos.length;
    if (totalPhotos === 0) return null;

    const currentPhoto = org.photos[currentIndex];
    const imgKey = `${org.id}-${currentIndex}`;
    const isBroken = brokenImages[imgKey];

    const getFileName = (photo: OrgExperienceItem["photos"][number], index: number) => {
        if (photo.label) return photo.label;
        const rawName = (photo.url.split("/").pop() || `photo_${index + 1}.jpg`).toLowerCase().replace(/\s+/g, "_");
        return `${String(index + 1).padStart(2, "0")}_${rawName}`;
    };

    const getFileExt = (url: string) => {
        return url.split(".").pop()?.toUpperCase() || "IMG";
    };

    return (
        <div className="pt-2 sm:pt-3 flex flex-col items-center">
            {/* Terminal Tabbed Image Viewer */}
            <div className="w-full max-w-2xl rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-[#161B22] overflow-hidden shadow-md">
                {/* Bar Tab ala Terminal */}
                <div className="flex items-center overflow-x-auto border-b border-slate-200 dark:border-slate-800 bg-slate-200/70 dark:bg-[#090C10] px-2 pt-2 gap-1">
                    {org.photos.map((photo, idx) => {
                        const isActive = idx === currentIndex;
                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setCurrentIndex(idx)}
                                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-t-lg font-mono text-[10px] sm:text-[11px] transition-all cursor-pointer shrink-0 border-t border-x ${
                                    isActive
                                        ? "bg-white dark:bg-[#161B22] text-emerald-600 dark:text-emerald-400 font-semibold border-slate-200 dark:border-slate-800 -mb-px shadow-xs"
                                        : "bg-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 border-transparent"
                                }`}
                            >
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${
                                        isActive ? "bg-emerald-500" : "bg-slate-400/50 dark:bg-slate-700"
                                    }`}
                                />
                                <span className="truncate max-w-[120px] sm:max-w-[180px]">
                                    {getFileName(photo, idx)}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Area Gambar dengan Transisi Halus & Tinggi Stabil */}
                <div
                    onClick={() =>
                        !isBroken &&
                        onOpenLightbox({
                            url: currentPhoto.url,
                            caption: currentPhoto.caption,
                            orgName: org.organization,
                        })
                    }
                    className={`group relative w-full h-[220px] sm:h-[380px] flex items-center justify-center bg-slate-50 dark:bg-[#0D1117] overflow-hidden ${
                        !isBroken ? "cursor-pointer" : ""
                    }`}
                >
                    {!isBroken ? (
                        <div
                            key={`${org.id}-${currentIndex}`}
                            className="w-full h-full flex items-center justify-center relative"
                        >
                            <motion.img
                                src={currentPhoto.url}
                                alt={currentPhoto.caption}
                                initial={{ opacity: 0, x: 8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                onError={() => onImageError(imgKey)}
                                className="max-w-full max-h-full w-auto h-auto object-contain select-none"
                            />
                            <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-md bg-black/70 text-white font-mono text-[10px] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                                <Maximize2 className="w-3 h-3 text-emerald-400" />
                                <span>{fullViewLabel}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center p-6 sm:p-8 text-center text-slate-400 dark:text-slate-600">
                            <ImageIcon className="w-7 h-7 mb-1.5" />
                            <span className="font-mono text-xs break-all">{currentPhoto.url}</span>
                        </div>
                    )}
                </div>

                {/* Status Bar & Metadata File */}
                <div className="px-3 sm:px-3.5 py-2.5 bg-white dark:bg-[#161B22] border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{currentPhoto.caption}</p>
                    <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            {getFileExt(currentPhoto.url)} • RO
                        </span>
                        <span>
                            [{currentIndex + 1}/{totalPhotos}]
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function OrgGalleryOutput({ onRunCommand }: OrgGalleryOutputProps) {
    const { lang } = useLanguage();
    const { organizations } = getPortfolioData(lang);
    const [lightboxPhoto, setLightboxPhoto] = useState<{
        url: string;
        caption: string;
        orgName: string;
    } | null>(null);
    const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

    const copy = {
        id: {
            recordsSuffix: "catatan",
            hint: "Pilih tab foto untuk melihat • Klik gambar untuk zoom",
            fullView: "Tampilan Penuh",
            tryOther: "Coba fitur lain:",
            gameLabel: "$ game (Mini Game)",
        },
        en: {
            recordsSuffix: "records",
            hint: "Select a photo tab to view • Click image to zoom",
            fullView: "Full View",
            tryOther: "Try other features:",
            gameLabel: "$ game (Mini Game)",
        },
    }[lang];

    return (
        <div className="my-2 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800 font-mono text-xs">
                <div className="flex items-center gap-2 font-semibold text-slate-600 dark:text-slate-300">
                    <Users className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>
                        ~/organizations/gallery ({organizations.length} {copy.recordsSuffix})
                    </span>
                </div>
                <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">{copy.hint}</span>
            </div>

            {/* Daftar Pengalaman Organisasi dengan Efek Snap / Tiling Pop */}
            <div className="space-y-4">
                {organizations.map((org, idx) => (
                    <motion.div
                        key={org.id}
                        initial={{ opacity: 0, scale: 0.98, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                            duration: 0.22,
                            delay: idx * 0.06,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="p-3.5 sm:p-5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] space-y-3.5 sm:space-y-4"
                    >
                        {/* Info Jabatan & Organisasi */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-snug">
                                    {org.role}
                                </h3>
                                <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                    {org.organization}
                                </p>
                            </div>

                            <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 shrink-0">
                                <span className="inline-flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-amber-500 shrink-0" />
                                    {org.period}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                                    {org.location}
                                </span>
                            </div>
                        </div>

                        {/* Deskripsi & Poin Pencapaian */}
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {org.description}
                        </p>

                        <ul className="space-y-1.5">
                            {org.highlights.map((item, hIdx) => (
                                <li
                                    key={hIdx}
                                    className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Slider Galeri Foto Satu per Satu */}
                        <OrgPhotoSlider
                            org={org}
                            fullViewLabel={copy.fullView}
                            brokenImages={brokenImages}
                            onImageError={key => setBrokenImages(prev => ({ ...prev, [key]: true }))}
                            onOpenLightbox={data => setLightboxPhoto(data)}
                        />
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal untuk Memperbesar Foto */}
            <AnimatePresence>
                {lightboxPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        onClick={() => setLightboxPhoto(null)}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            onClick={e => e.stopPropagation()}
                            className="max-w-3xl w-full rounded-xl border border-slate-700 bg-[#0D1117] overflow-hidden shadow-2xl"
                        >
                            <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 font-mono text-xs text-slate-300">
                                <span className="truncate pr-4">{lightboxPhoto.orgName}</span>
                                <button
                                    onClick={() => setLightboxPhoto(null)}
                                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
                                <img
                                    src={lightboxPhoto.url}
                                    alt={lightboxPhoto.caption}
                                    className="max-h-[70vh] w-auto object-contain"
                                />
                            </div>
                            <div className="p-3.5 text-xs text-slate-300 bg-[#161B22]">{lightboxPhoto.caption}</div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigasi Lanjutan */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
                <span>{copy.tryOther}</span>
                <button
                    onClick={() => onRunCommand("game")}
                    className="px-2.5 py-1 sm:py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 cursor-pointer"
                >
                    {copy.gameLabel}
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
