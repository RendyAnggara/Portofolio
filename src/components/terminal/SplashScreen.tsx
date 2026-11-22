import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
    onFinish: () => void;
    durationMs?: number;
}

const PACKAGES = ["rendy-core", "next-react-ui", "laravel-go-api", "org-gallery-fs", "cli-shell-rice"];

export function SplashScreen({ onFinish, durationMs = 1350 }: SplashScreenProps) {
    const { lang } = useLanguage();
    const totalDots = 24;
    const [pos, setPos] = useState(0);
    const [mouthOpen, setMouthOpen] = useState(true);
    const [show, setShow] = useState(true);
    const finishedRef = useRef(false);

    const triggerFinish = () => {
        if (finishedRef.current) return;
        finishedRef.current = true;
        onFinish();
    };

    useEffect(() => {
        const stepMs = Math.max(30, Math.floor(durationMs / (totalDots + 1)));
        let hideTimeoutId: ReturnType<typeof setTimeout> | undefined;

        const interval = setInterval(() => {
            setMouthOpen(m => !m);
            setPos(prev => {
                if (prev >= totalDots) {
                    clearInterval(interval);
                    hideTimeoutId = setTimeout(() => {
                        setShow(false);
                    }, 140);
                    return totalDots;
                }
                return prev + 1;
            });
        }, stepMs);

        return () => {
            clearInterval(interval);
            if (hideTimeoutId) clearTimeout(hideTimeoutId);
        };
    }, [durationMs]);

    const handleSkip = () => {
        setShow(false);
        triggerFinish();
    };

    const copy = {
        id: {
            syncing: ":: Menyinkronkan basis data paket portofolio...",
            downloading: "mengunduh",
            skipHint: "Klik di mana saja untuk melewati splash screen",
        },
        en: {
            syncing: ":: Synchronizing portfolio package databases...",
            downloading: "downloading",
            skipHint: "Click anywhere to skip splash screen",
        },
    }[lang];

    const progressRatio = Math.min(1, pos / totalDots);
    const activePkgIndex = Math.min(PACKAGES.length - 1, Math.floor(progressRatio * PACKAGES.length));
    const percent = Math.round(progressRatio * 100);

    const pacmanChar = mouthOpen ? "ᗧ" : "●";
    const eatenSpace = " ".repeat(pos);
    const remainingDots = "· ".repeat(Math.max(0, totalDots - pos)).trimEnd();

    return (
        <AnimatePresence onExitComplete={triggerFinish}>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={handleSkip}
                    className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 bg-slate-50 dark:bg-[#0B0F17] bg-dot-grid font-mono text-xs sm:text-sm text-left text-slate-700 dark:text-slate-300 select-none cursor-pointer"
                >
                    {/* Header */}
                    <div className="text-left space-y-1">
                        <div className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wide">
                            {copy.syncing}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500">
                            rendy@portfolio — pacman init
                        </div>
                    </div>

                    {/* Center-Left Pacman Progress */}
                    <div className="space-y-2.5 max-w-2xl text-left">
                        <div className="text-slate-600 dark:text-slate-400">
                            {copy.downloading}{" "}
                            <span className="text-sky-600 dark:text-sky-400 font-semibold">
                                {PACKAGES[activePkgIndex]}
                            </span>
                            .pkg.tar.zst...
                        </div>

                        <div className="flex items-center gap-3 text-sm sm:text-base">
                            <span className="text-amber-500 dark:text-amber-400 font-semibold shrink-0">
                                [{percent.toString().padStart(3, " ")}%]
                            </span>
                            <span className="tracking-wider whitespace-pre overflow-hidden">
                                {eatenSpace}
                                <span className="font-bold text-amber-400">{pacmanChar}</span>{" "}
                                <span className="text-slate-400 dark:text-slate-600">{remainingDots}</span>
                            </span>
                        </div>
                    </div>

                    {/* Footer Hint */}
                    <div className="text-[11px] text-slate-400 dark:text-slate-600 text-left">{copy.skipHint}</div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
