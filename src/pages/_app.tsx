import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <LanguageProvider>
                <div
                    className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-slate-100 text-slate-900 dark:bg-[#090C10] dark:text-slate-100 transition-colors duration-300`}
                >
                    <Component {...pageProps} />
                </div>
            </LanguageProvider>
        </ThemeProvider>
    );
}
