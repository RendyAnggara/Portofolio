"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

export type Locale = "id" | "en";

interface LanguageContextType {
    lang: Locale;
    setLang: (lang: Locale) => void;
    toggleLang: () => void;
}

const STORAGE_KEY = "portfolio-lang";
const LANG_EVENT = "portfolio-lang-change";

function subscribeLang(callback: () => void) {
    if (typeof window === "undefined") return () => {};

    const onStorage = (e: StorageEvent) => {
        if (e.key === STORAGE_KEY) callback();
    };
    const onCustom = () => callback();

    window.addEventListener("storage", onStorage);
    window.addEventListener(LANG_EVENT, onCustom);

    return () => {
        window.removeEventListener("storage", onStorage);
        window.removeEventListener(LANG_EVENT, onCustom);
    };
}

function getLangSnapshot(): Locale {
    if (typeof window === "undefined") return "id";
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "en" ? "en" : "id";
}

function getServerLangSnapshot(): Locale {
    return "id";
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "id",
    setLang: () => {},
    toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const lang = useSyncExternalStore(subscribeLang, getLangSnapshot, getServerLangSnapshot);

    const setLang = (next: Locale) => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(STORAGE_KEY, next);
            window.dispatchEvent(new Event(LANG_EVENT));
        }
    };

    const toggleLang = () => {
        setLang(lang === "id" ? "en" : "id");
    };

    return <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    return useContext(LanguageContext);
}
