import { useTheme } from "next-themes";
import { useEffect, useRef, useSyncExternalStore } from "react";

interface TerminalAvatarProps {
    src: string;
    size?: number;
}

const emptySubscribe = () => () => {};

export function TerminalAvatar({ src, size = 165 }: TerminalAvatarProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { resolvedTheme } = useTheme();
    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
    );

    const isLight = mounted && resolvedTheme === "light";

    useEffect(() => {
        if (!mounted || isLight) return; // Light mode langsung pakai <img> avatar-light.png tanpa olah canvas

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = src;

        img.onload = () => {
            const res = 320;
            canvas.width = res;
            canvas.height = res;

            ctx.clearRect(0, 0, res, res);
            ctx.drawImage(img, 0, 0, res, res);

            const imageData = ctx.getImageData(0, 0, res, res);
            const data = imageData.data;

            // Dark mode: hapus background gelap, pertahankan garis hijau tajam
            for (let i = 0; i < data.length; i += 4) {
                const brightness = Math.max(data[i], data[i + 1], data[i + 2]);
                if (brightness < 45) {
                    data[i + 3] = 0;
                } else {
                    const alpha = Math.min(255, Math.round(((brightness - 45) / 180) * 255));
                    data[i] = 52;
                    data[i + 1] = 211;
                    data[i + 2] = 153;
                    data[i + 3] = alpha;
                }
            }

            ctx.putImageData(imageData, 0, 0);
        };
    }, [src, isLight, mounted]);

    if (isLight) {
        return (
            <img
                src="/images/org/avatar-light.png"
                alt="Rendy Terminal Avatar"
                style={{ width: size, height: size }}
                className="block object-contain mix-blend-multiply select-none"
            />
        );
    }

    return (
        <canvas
            ref={canvasRef}
            style={{ width: size, height: size }}
            className="block select-none"
            aria-label="Rendy Terminal Avatar"
        />
    );
}
