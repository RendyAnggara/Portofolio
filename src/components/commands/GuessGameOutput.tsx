import { useLanguage } from "@/context/LanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import {
    AlertTriangle,
    Crosshair,
    Flame,
    Gamepad2,
    History,
    RotateCcw,
    Snowflake,
    Sparkles,
    Trophy,
} from "lucide-react";
import React, { useMemo, useState } from "react";

type GuessOutcome = "high-close" | "high-far" | "low-close" | "low-far" | "win";

interface GuessLog {
    guess: number;
    attempts: number;
    outcome: GuessOutcome;
}

const MAX_ATTEMPTS = 10;
const BEST_SCORE_KEY = "portfolio-guess-best-score";

function readBestScore(): number | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(BEST_SCORE_KEY);
    if (!raw) return null;
    const parsed = parseInt(raw, 10);
    return Number.isFinite(parsed) && parsed > 0 && parsed <= MAX_ATTEMPTS ? parsed : null;
}

function writeBestScore(score: number) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(BEST_SCORE_KEY, String(score));
}

export function GuessGameOutput() {
    const { lang } = useLanguage();
    const [targetNumber, setTargetNumber] = useState<number>(() => Math.floor(Math.random() * 100) + 1);
    const [inputValue, setInputValue] = useState<string>("");
    const [logs, setLogs] = useState<GuessLog[]>([]);
    const [isWon, setIsWon] = useState<boolean>(false);
    const [isLost, setIsLost] = useState<boolean>(false);
    const [bestScore, setBestScore] = useState<number | null>(() => readBestScore());

    const copy = {
        id: {
            title: "MINI-GAME: GUESS THE NUMBER (1 - 100)",
            resetTitle: "Ulangi Permainan",
            reset: "Reset",
            introPrefix: "Sistem telah memilih angka rahasia antara",
            introRange: "1 sampai 100",
            introSuffix: `. Maksimal ${MAX_ATTEMPTS} percobaan. Persempit rentang di visualizer kiri dan pantau log di kanan.`,
            rangeLabel: "RENTANG AKTIF",
            attemptsLabel: "PERCOBAAN",
            leftLabel: "SISA",
            bestLabel: "TERBAIK",
            placeholder: "Masukkan angka (1-100)...",
            guessBtn: "Tebak",
            playAgain: "Main Lagi",
            newRecord: "REKOR BARU!",
            scoreLabel: (attempts: number) => `Skor: ${attempts}/${MAX_ATTEMPTS} percobaan`,
            outOfAttemptsBanner: (secret: number) => `Kesempatan habis! Angka rahasia yang benar adalah ${secret}.`,
            logTitle: "TELEMETRY LOG",
            emptyLog: "Belum ada tebakan. Masukkan angka pertama untuk memulai.",
            slotsLabel: "SLOT KESEMPATAN",
            midHint: "Tengah rentang:",
            formatLog: (log: GuessLog, secret: number, outOfAttemptsAfter: boolean) => {
                switch (log.outcome) {
                    case "win":
                        return `TEPAT SEKALI! Angka rahasianya adalah ${secret}. Selesai dalam ${log.attempts} percobaan.`;
                    case "high-close":
                        return outOfAttemptsAfter
                            ? `Terlalu TINGGI (sangat dekat). Kesempatan habis — angka rahasianya adalah ${secret}.`
                            : "Terlalu TINGGI, tapi sudah sangat dekat!";
                    case "high-far":
                        return outOfAttemptsAfter
                            ? `Terlalu TINGGI. Kesempatan habis — angka rahasianya adalah ${secret}.`
                            : "Terlalu TINGGI. Coba angka yang lebih kecil.";
                    case "low-close":
                        return outOfAttemptsAfter
                            ? `Terlalu RENDAH (sangat dekat). Kesempatan habis — angka rahasianya adalah ${secret}.`
                            : "Terlalu RENDAH, tapi sudah sangat dekat!";
                    case "low-far":
                        return outOfAttemptsAfter
                            ? `Terlalu RENDAH. Kesempatan habis — angka rahasianya adalah ${secret}.`
                            : "Terlalu RENDAH. Coba angka yang lebih besar.";
                }
            },
        },
        en: {
            title: "MINI-GAME: GUESS THE NUMBER (1 - 100)",
            resetTitle: "Restart Game",
            reset: "Reset",
            introPrefix: "The system has picked a secret number between",
            introRange: "1 and 100",
            introSuffix: `. Up to ${MAX_ATTEMPTS} attempts. Narrow the range on the left and track logs on the right.`,
            rangeLabel: "ACTIVE RANGE",
            attemptsLabel: "ATTEMPTS",
            leftLabel: "LEFT",
            bestLabel: "BEST",
            placeholder: "Enter a number (1-100)...",
            guessBtn: "Guess",
            playAgain: "Play Again",
            newRecord: "NEW RECORD!",
            scoreLabel: (attempts: number) =>
                `Score: ${attempts}/${MAX_ATTEMPTS} ${attempts === 1 ? "attempt" : "attempts"}`,
            outOfAttemptsBanner: (secret: number) => `Out of attempts! The secret number was ${secret}.`,
            logTitle: "TELEMETRY LOG",
            emptyLog: "No guesses yet. Enter a number to start.",
            slotsLabel: "ATTEMPT SLOTS",
            midHint: "Range mid:",
            formatLog: (log: GuessLog, secret: number, outOfAttemptsAfter: boolean) => {
                switch (log.outcome) {
                    case "win":
                        return `SPOT ON! The secret number was ${secret}. Solved in ${log.attempts} ${
                            log.attempts === 1 ? "attempt" : "attempts"
                        }.`;
                    case "high-close":
                        return outOfAttemptsAfter
                            ? `Too HIGH (very close). Out of attempts — the secret number was ${secret}.`
                            : "Too HIGH, but very close!";
                    case "high-far":
                        return outOfAttemptsAfter
                            ? `Too HIGH. Out of attempts — the secret number was ${secret}.`
                            : "Too HIGH. Try a smaller number.";
                    case "low-close":
                        return outOfAttemptsAfter
                            ? `Too LOW (very close). Out of attempts — the secret number was ${secret}.`
                            : "Too LOW, but very close!";
                    case "low-far":
                        return outOfAttemptsAfter
                            ? `Too LOW. Out of attempts — the secret number was ${secret}.`
                            : "Too LOW. Try a larger number.";
                }
            },
        },
    }[lang];

    const isGameOver = isWon || isLost;
    const remainingAttempts = Math.max(0, MAX_ATTEMPTS - logs.length);

    const { minBound, maxBound, midSuggestion, isNewBest } = useMemo(() => {
        let min = 1;
        let max = 100;

        for (const item of logs) {
            if (item.outcome === "low-close" || item.outcome === "low-far") {
                min = Math.max(min, Math.min(100, item.guess + 1));
            } else if (item.outcome === "high-close" || item.outcome === "high-far") {
                max = Math.min(max, Math.max(1, item.guess - 1));
            }
        }

        const winAttempts = isWon ? logs.length : null;
        const record = winAttempts !== null && bestScore === winAttempts;

        return {
            minBound: min,
            maxBound: max,
            midSuggestion: Math.floor((min + max) / 2),
            isNewBest: record,
        };
    }, [logs, isWon, bestScore]);

    const handleGuess = (e: React.FormEvent) => {
        e.preventDefault();
        if (isGameOver || logs.length >= MAX_ATTEMPTS) return;

        const num = parseInt(inputValue, 10);
        if (isNaN(num) || num < 1 || num > 100) {
            return;
        }

        const attempts = logs.length + 1;
        const diff = Math.abs(targetNumber - num);
        let outcome: GuessOutcome = "low-far";

        if (num === targetNumber) {
            outcome = "win";
            setIsWon(true);
            setBestScore(prev => {
                const nextBest = prev === null ? attempts : Math.min(prev, attempts);
                writeBestScore(nextBest);
                return nextBest;
            });
        } else {
            if (num > targetNumber) {
                outcome = diff <= 5 ? "high-close" : "high-far";
            } else {
                outcome = diff <= 5 ? "low-close" : "low-far";
            }

            if (attempts >= MAX_ATTEMPTS) {
                setIsLost(true);
            }
        }

        setLogs(prev => [...prev, { guess: num, attempts, outcome }]);
        setInputValue("");
    };

    const resetGame = () => {
        setTargetNumber(Math.floor(Math.random() * 100) + 1);
        setInputValue("");
        setLogs([]);
        setIsWon(false);
        setIsLost(false);
    };

    const leftPercent = ((minBound - 1) / 99) * 100;
    const widthPercent = Math.max(4, ((maxBound - minBound) / 99) * 100);
    const lastLog = logs[logs.length - 1];

    return (
        <div className="my-2 p-3.5 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1117] w-full space-y-4 shadow-xs">
            {/* Header Game */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 min-w-0">
                    <Gamepad2 className="w-4 h-4 shrink-0" />
                    <span className="truncate">{copy.title}</span>
                </div>
                <button
                    type="button"
                    onClick={resetGame}
                    title={copy.resetTitle}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                >
                    <RotateCcw className="w-3 h-3" />
                    <span>{copy.reset}</span>
                </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {copy.introPrefix} <strong className="text-slate-800 dark:text-slate-200">{copy.introRange}</strong>
                {copy.introSuffix}
            </p>

            {/* Grid 2 Kolom: Kiri (Visualizer & Input) | Kanan (Attempt Slots & Telemetry Log) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                {/* Kolom Kiri */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-4 min-w-0">
                    <div className="p-3 sm:p-3.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-[#11161F] font-mono space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                            <span className="inline-flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                <Crosshair className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                                <span>{copy.rangeLabel}:</span>
                                <strong className="text-sky-600 dark:text-sky-400">
                                    [{isGameOver ? targetNumber : `${minBound} .. ${maxBound}`}]
                                </strong>
                            </span>

                            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                                <span className="text-slate-500 dark:text-slate-400">
                                    {copy.attemptsLabel}:{" "}
                                    <strong className="text-slate-800 dark:text-slate-200">
                                        {logs.length}/{MAX_ATTEMPTS}
                                    </strong>
                                </span>
                                <span
                                    className={
                                        remainingAttempts <= 2 && !isWon
                                            ? "text-rose-600 dark:text-rose-400 font-semibold"
                                            : "text-slate-500 dark:text-slate-400"
                                    }
                                >
                                    {copy.leftLabel}: <strong>{remainingAttempts}</strong>
                                </span>
                                {bestScore !== null && (
                                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                        <Sparkles className="w-3 h-3 shrink-0" />
                                        <span>
                                            {copy.bestLabel}: <strong>{bestScore}</strong>
                                        </span>
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Track 1..100 */}
                        <div className="space-y-1">
                            <div className="relative h-2.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                <motion.div
                                    initial={false}
                                    animate={{
                                        left: isGameOver ? `${((targetNumber - 1) / 99) * 100}%` : `${leftPercent}%`,
                                        width: isGameOver ? "6%" : `${widthPercent}%`,
                                    }}
                                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                                    className={`absolute top-0 bottom-0 rounded-full ${
                                        isWon
                                            ? "bg-emerald-500"
                                            : isLost
                                              ? "bg-rose-500"
                                              : "bg-gradient-to-r from-sky-500 via-emerald-400 to-amber-400"
                                    }`}
                                />
                            </div>
                            <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
                                <span>1</span>
                                <span>25</span>
                                <span>50</span>
                                <span>75</span>
                                <span>100</span>
                            </div>
                        </div>

                        {/* Indikator Suhu Tebakan Terakhir */}
                        {lastLog && (
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-200/70 dark:border-slate-800/80 text-[11px]">
                                <span className="text-slate-500 dark:text-slate-400">
                                    last_guess ={" "}
                                    <strong className="text-slate-800 dark:text-slate-200">{lastLog.guess}</strong>
                                </span>
                                <span
                                    className={`inline-flex items-center gap-1 font-semibold ${
                                        lastLog.outcome === "win"
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : isLost
                                              ? "text-rose-600 dark:text-rose-400"
                                              : lastLog.outcome.startsWith("high")
                                                ? "text-amber-600 dark:text-amber-400"
                                                : "text-sky-600 dark:text-sky-400"
                                    }`}
                                >
                                    {lastLog.outcome === "win" ? (
                                        <Trophy className="w-3 h-3" />
                                    ) : isLost ? (
                                        <AlertTriangle className="w-3 h-3" />
                                    ) : lastLog.outcome.includes("close") ? (
                                        <Flame className="w-3 h-3" />
                                    ) : (
                                        <Snowflake className="w-3 h-3" />
                                    )}
                                    <span>{isLost ? "OUT_OF_ATTEMPTS" : lastLog.outcome.toUpperCase()}</span>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Form Input Tebakan atau Banner Hasil Akhir */}
                    {!isGameOver ? (
                        <div className="space-y-2">
                            <form onSubmit={handleGuess} className="flex items-center gap-2 font-mono">
                                <div className="flex-1 min-w-0 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus-within:border-emerald-500 transition-colors">
                                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold select-none shrink-0">
                                        guess&gt;
                                    </span>
                                    <input
                                        type="number"
                                        min={1}
                                        max={100}
                                        value={inputValue}
                                        onChange={e => setInputValue(e.target.value)}
                                        placeholder={copy.placeholder}
                                        className="w-full min-w-0 bg-transparent text-base sm:text-xs text-slate-800 dark:text-slate-100 outline-none placeholder:text-xs placeholder:text-slate-400 dark:placeholder:text-slate-600"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="px-4 py-2 sm:py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
                                >
                                    {copy.guessBtn}
                                </button>
                            </form>

                            {/* Quick Mid Suggestion */}
                            <div className="flex items-center justify-between font-mono text-[11px] text-slate-500 dark:text-slate-400 px-1">
                                <span>{copy.midHint}</span>
                                <button
                                    type="button"
                                    onClick={() => setInputValue(String(midSuggestion))}
                                    className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:border-emerald-500 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 font-semibold cursor-pointer transition-colors"
                                >
                                    {midSuggestion}
                                </button>
                            </div>
                        </div>
                    ) : isWon ? (
                        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                <Trophy className="w-4 h-4 shrink-0" />
                                <span>{copy.scoreLabel(logs.length)}</span>
                                {isNewBest && (
                                    <span className="px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-[10px]">
                                        {copy.newRecord}
                                    </span>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={resetGame}
                                className="px-3 py-1.5 sm:py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
                            >
                                {copy.playAgain}
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30">
                            <div className="flex items-start gap-2 text-xs font-mono text-rose-600 dark:text-rose-400 font-semibold min-w-0">
                                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>{copy.outOfAttemptsBanner(targetNumber)}</span>
                            </div>
                            <button
                                type="button"
                                onClick={resetGame}
                                className="px-3 py-1.5 sm:py-1 rounded-md bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
                            >
                                {copy.playAgain}
                            </button>
                        </div>
                    )}
                </div>

                {/* Kolom Kanan: Attempt Slots & Telemetry Log */}
                <div className="lg:col-span-6 p-3 sm:p-3.5 rounded-lg border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-[#11161F] font-mono flex flex-col justify-between space-y-3 min-w-0">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-[11px] border-b border-slate-200/80 dark:border-slate-800 pb-2">
                            <span className="inline-flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-300">
                                <History className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span>{copy.logTitle}</span>
                            </span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">{copy.slotsLabel}</span>
                        </div>

                        {/* 10 Slot Indikator: 5 kolom di HP kecil, 10 kolom di sm+ */}
                        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-1">
                            {Array.from({ length: MAX_ATTEMPTS }).map((_, idx) => {
                                const entry = logs[idx];
                                let slotStyle = "bg-slate-200/80 dark:bg-slate-800 text-slate-400 dark:text-slate-600";
                                if (entry) {
                                    slotStyle =
                                        entry.outcome === "win"
                                            ? "bg-emerald-500 text-white font-bold"
                                            : entry.outcome.startsWith("high")
                                              ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40"
                                              : "bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/40";
                                }

                                return (
                                    <div
                                        key={idx}
                                        className={`h-7 sm:h-6 rounded flex items-center justify-center text-[11px] sm:text-[10px] transition-colors ${slotStyle}`}
                                    >
                                        {entry ? entry.guess : idx + 1}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Daftar Log Tebakan Utuh */}
                    <AnimatePresence initial={false}>
                        {logs.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-1.5 text-xs"
                            >
                                {logs.map((log, index) => {
                                    const outOfAttemptsAfter = log.outcome !== "win" && log.attempts >= MAX_ATTEMPTS;
                                    const colorClass =
                                        log.outcome === "win"
                                            ? "text-emerald-600 dark:text-emerald-400 font-bold"
                                            : outOfAttemptsAfter
                                              ? "text-rose-600 dark:text-rose-400 font-semibold"
                                              : log.outcome.startsWith("high")
                                                ? "text-amber-600 dark:text-amber-400"
                                                : "text-sky-600 dark:text-sky-400";

                                    return (
                                        <div key={index} className="flex items-start gap-2 min-w-0">
                                            <span className="text-slate-400 shrink-0">
                                                [#{index + 1}/{MAX_ATTEMPTS}] ({log.guess}) →
                                            </span>
                                            <span className={`${colorClass} break-words min-w-0 leading-relaxed`}>
                                                {copy.formatLog(log, targetNumber, outOfAttemptsAfter)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        ) : (
                            <div className="py-4 text-center text-[11px] text-slate-400 dark:text-slate-500 italic">
                                {copy.emptyLog}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
