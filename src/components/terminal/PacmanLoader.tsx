import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";

interface PacmanLoaderProps {
    label?: string;
    onComplete: () => void;
    durationMs?: number;
}

export function PacmanLoader({ label, onComplete, durationMs = 900 }: PacmanLoaderProps) {
    const { lang } = useLanguage();
    const totalDots = 18;
    const [pos, setPos] = useState(0);
    const [mouthOpen, setMouthOpen] = useState(true);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        const stepTime = Math.max(20, Math.floor(durationMs / (totalDots + 1)));
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        const interval = setInterval(() => {
            setMouthOpen(m => !m);
            setPos(prev => {
                if (prev >= totalDots) {
                    clearInterval(interval);
                    timeoutId = setTimeout(() => {
                        onCompleteRef.current();
                    }, 60);
                    return totalDots;
                }
                return prev + 1;
            });
        }, stepTime);

        return () => {
            clearInterval(interval);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [durationMs]);

    const resolvedLabel = label ?? (lang === "id" ? "memuat modul" : "loading module");
    const pacmanChar = mouthOpen ? "ᗧ" : "●";
    const eatenSpace = " ".repeat(pos);
    const remainingDots = "· ".repeat(Math.max(0, totalDots - pos)).trimEnd();

    return (
        <div className="font-mono text-xs py-1.5 flex items-center gap-2.5 select-none text-amber-500 dark:text-amber-400">
            <span className="text-slate-400 dark:text-slate-500">[{resolvedLabel}]</span>
            <span className="tracking-wider whitespace-pre">
                {eatenSpace}
                <span className="font-bold text-amber-400">{pacmanChar}</span>{" "}
                <span className="text-slate-400 dark:text-slate-500">{remainingDots}</span>
            </span>
        </div>
    );
}
