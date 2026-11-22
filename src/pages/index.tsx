import { TerminalWindow } from "@/components/terminal/TerminalWindow";
import Head from "next/head";

export default function Home() {
    return (
        <>
            <Head>
                <title>Rendy | Terminal Portfolio</title>
                <meta name="description" content="Interactive CLI Portfolio - Web & Mobile Developer" />
            </Head>

            <main className="h-screen w-screen overflow-hidden">
                <TerminalWindow />
            </main>
        </>
    );
}
