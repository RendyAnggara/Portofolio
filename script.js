// 1. VANTA CLOUDS INITIALIZATION (Disimpan ke variabel vantaEffect agar bisa di-update)
let vantaEffect = VANTA.CLOUDS({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    skyColor: 0x4a86ba /* Pagi: Langit biru medium */,
    cloudColor: 0x8ab2d6 /* Pagi: Awan kebiruan teduh */,
    cloudShadowColor: 0x2b5278,
    sunColor: 0xffaa00 /* Warna inti matahari kuning emas */,
    sunGlareColor: 0xffdd66 /* Silau/pantulan cahaya matahari */,
    sunlightColor: 0xffeedd /* Cahaya keemasan di atas awan */,
    speed: 0.7,
});

// 2. DAY / NIGHT THEME TOGGLE LOGIC
const themeToggleBtn = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon-i");
let isNight = false;

themeToggleBtn?.addEventListener("click", () => {
    isNight = !isNight;
    document.body.classList.toggle("night-theme", isNight);

    if (isNight) {
        // Ganti Ikon ke Bulan
        themeIcon?.classList.remove("fa-sun");
        themeIcon?.classList.add("fa-moon");

        // Ubah Vanta Clouds ke Mode Malam (Midnight & Soft Moon Glow)
        vantaEffect.setOptions({
            skyColor: 0x0b132b /* Malam: Langit Midnight Gelap */,
            cloudColor: 0x1c2541 /* Malam: Awan Navy */,
            cloudShadowColor: 0x070d1e,
            sunColor: 0xe0f2fe /* Cahaya Bulan Perak */,
            sunGlareColor: 0x93c5fd,
            sunlightColor: 0x3b82f6,
            speed: 0.5,
        });
    } else {
        // Ganti Ikon ke Matahari
        themeIcon?.classList.remove("fa-moon");
        themeIcon?.classList.add("fa-sun");

        // Kembalikan Vanta Clouds ke Mode Pagi
        vantaEffect.setOptions({
            skyColor: 0x4a86ba,
            cloudColor: 0x8ab2d6,
            cloudShadowColor: 0x2b5278,
            sunColor: 0xffaa00,
            sunGlareColor: 0xffdd66,
            sunlightColor: 0xffeedd,
            speed: 0.7,
        });
    }
});

// 3. RETRO AUDIO PLAYER FUNCTIONALITY
const audio = document.getElementById("bg-audio");
const playBtn = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const wheelLeft = document.getElementById("wheel-left");
const wheelRight = document.getElementById("wheel-right");
const currentTimeEl = document.getElementById("current-time");
const durationTimeEl = document.getElementById("duration-time");

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

playBtn?.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playIcon.classList.remove("fa-play");
        playIcon.classList.add("fa-pause");
        wheelLeft.classList.add("spinning");
        wheelRight.classList.add("spinning");
    } else {
        audio.pause();
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");
        wheelLeft.classList.remove("spinning");
        wheelRight.classList.remove("spinning");
    }
});

audio?.addEventListener("loadedmetadata", () => {
    durationTimeEl.textContent = formatTime(audio.duration);
});

audio?.addEventListener("timeupdate", () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio?.addEventListener("ended", () => {
    playIcon.classList.remove("fa-pause");
    playIcon.classList.add("fa-play");
    wheelLeft.classList.remove("spinning");
    wheelRight.classList.remove("spinning");
});
