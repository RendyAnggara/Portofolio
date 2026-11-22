import { Locale } from "@/context/LanguageContext";

export interface ProjectItem {
    id: string;
    title: string;
    category: "Web App" | "Mobile App" | "Full-Stack" | "Backend";
    description: string;
    techStack: string[];
    githubUrl?: string;
    demoUrl?: string;
    featured?: boolean;
    inDevelopment?: boolean;
}

export interface OrgExperienceItem {
    id: string;
    role: string;
    organization: string;
    period: string;
    location: string;
    description: string;
    highlights: string[];
    photos: {
        url: string;
        label?: string;
        caption: string;
    }[];
}

const SHARED_DATA = {
    profileBase: {
        name: "Muhammad Rendyansyah Dwi Anggara",
        nickname: "Rendy",
        role: "Full-Stack Web & Mobile Developer",
        status: "Open to Work & Freelance",
        university: "Universitas Buana Perjuangan Karawang",
        os: "Linux / Windows 11",
        editor: "VS Code",
    },
    skills: {
        Frontend: [
            "React",
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Ionic Angular",
            "Bootstrap",
            "HTML",
            "CSS",
            "JavaScript",
        ],
        Backend: ["PHP", "Laravel", "Go (Golang)", "REST API"],
        Database: ["MySQL"],
        ToolsAndOS: ["Git", "GitHub", "GitLab", "Laragon", "Docker"],
    },
    contact: {
        email: "rendyansyahdwianggara4350@gmail.com",
        github: "https://github.com/RendyAnggara",
        instagram: "https://instagram.com/anggara.rndyy_",
        cvUrl: "/cv-rendy.pdf",
    },
};

const DATA_BY_LOCALE = {
    id: {
        profile: {
            ...SHARED_DATA.profileBase,
            major: "Teknik Informatika",
            location: "Karawang, Jawa Barat, Indonesia",
            bio: "Mahasiswa Teknik Informatika Universitas Buana Perjuangan Karawang yang berfokus pada pengembangan aplikasi web modern, aplikasi mobile lintas platform, serta eksplorasi sistem operasi Linux. Terbiasa mengerjakan solusi perangkat lunak secara end-to-end mulai dari pemodelan basis data relasional, perancangan REST API, hingga pengembangan antarmuka yang responsif dan bersih.\n\nBerpengalaman membangun berbagai proyek aplikasi dan produk digital mulai dari learning marketplace, game kasual Android yang dipublikasikan di Google Play Store, hingga aplikasi produktivitas serta aktif mengasah kepemimpinan dan koordinasi lintas tim melalui kepanitiaan dan organisasi kemahasiswaan. Terbuka untuk peluang magang, proyek freelance, maupun kolaborasi pengembangan perangkat lunak.",
        },
        skills: SHARED_DATA.skills,
        projects: [
            {
                id: "eduvan",
                title: "EduVan — Learning Marketplace Platform",
                category: "Full-Stack",
                description:
                    "Platform marketplace pembelajaran full-stack yang menghubungkan mentor dan pelajar dengan fitur manajemen kelas, transaksi, serta aplikasi mobile.",
                techStack: ["Laravel", "Ionic", "Angular", "TypeScript", "MySQL"],
                demoUrl: "https://play.google.com/store/apps/details?id=com.rehalivan.eduvan&pcampaignid=web_share",
                featured: true,
            },
            {
                id: "bottleflip",
                title: "BottleFlipMaster",
                category: "Mobile App",
                description:
                    "Game kasual Android yang telah melalui tahap closed testing dan dipublikasikan secara resmi di Google Play Store.",
                techStack: ["Ionic", "TypeScript", "HTML", "SCSS"],
                demoUrl: "https://play.google.com/store/apps/details?id=com.rehalivan.bottleflip&pcampaignid=web_share",
            },
            {
                id: "tracking",
                title: "Tracking Progress Belajar",
                category: "Backend",
                description:
                    "Aplikasi web untuk memantau progres belajar serta pengingat produktivitas akademik pengguna.",
                techStack: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
                githubUrl: "https://github.com/HaikalAjiPrabowo/trackingprogressbelajar.git",
            },
            {
                id: "skill",
                title: "Skill-Swap — Peer-to-Peer Skill Exchange App",
                category: "Mobile App",
                description:
                    "Aplikasi kolaboratif untuk mencari partner belajar dan bertukar keahlian secara langsung (peer-to-peer) melalui sistem pencocokan minat dan jadwal sesi. Saat ini sedang dalam tahap pengembangan aktif dan segera dirilis.",
                techStack: ["Ionic", "TypeScript", "HTML", "SCSS"],
                inDevelopment: true,
            },
        ] as ProjectItem[],
        organizations: [
            {
                id: "bem-fik",
                role: "Anggota Divisi Minat & Bakat (MINBA)",
                organization: "BEM FIK — Badan Eksekutif Mahasiswa",
                period: "2026 – 2027",
                location: "Universitas Buana Perjuangan Karawang",
                description:
                    "Berpartisipasi aktif dalam merancang dan menjalankan program kerja kemahasiswaan untuk mewadahi potensi akademik maupun non-akademik mahasiswa Fakultas Ilmu Komputer.",
                highlights: [
                    "Berkontribusi dalam penyelenggaraan kegiatan pengembangan minat, bakat, serta jejaring antar mahasiswa fakultas.",
                ],
                photos: [
                    {
                        url: "/images/org/rendy.jpeg",
                        label: "01_kegiatan_bem_fik.jpeg",
                        caption: "Kegiatan BEM FIK UBP Karawang",
                    },
                ],
            },
            {
                id: "inaugurasi-fik-2026",
                role: "Ketua Pelaksana (Chief Executive)",
                organization: "Inaugurasi Fakultas Ilmu Komputer 2026",
                period: "Nov 2026",
                location: "Ranca Upas, Bandung",
                description:
                    "Memimpin seluruh rangkaian perencanaan, koordinasi lintas divisi, manajemen anggaran, hingga eksekusi acara penyambutan mahasiswa baru Fakultas Ilmu Komputer.",
                highlights: [
                    "Mengkoordinasikan puluhan panitia lintas divisi selama masa persiapan hingga hari pelaksanaan.",
                    "Mengelola logistik, perizinan lokasi, serta memastikan kelancaran seluruh rangkaian acara outdoor di Ranca Upas.",
                ],
                photos: [
                    {
                        url: "/images/org/Inau-banner.jpeg",
                        label: "01_spanduk_inaugurasi.jpeg",
                        caption: "Dokumentasi kegiatan Inaugurasi FIK 2026 di Ranca Upas",
                    },
                    {
                        url: "/images/org/pengukuhan.jpeg",
                        label: "02_sesi_pengukuhan.jpeg",
                        caption: "Dokumentasi Pengukuhan Mahasiswa FIK",
                    },
                    {
                        url: "/images/org/Pembukaan.jpeg",
                        label: "03_upacara_pembukaan.jpeg",
                        caption: "Dokumentasi Penyambutan kegiatan Inaugurasi FIK 2026",
                    },
                    {
                        url: "/images/org/Pulang-Inau.jpeg",
                        label: "04_penutupan_acara.jpeg",
                        caption: "Dokumentasi Kepulangan Inaugurasi FIK 2026",
                    },
                ],
            },
            {
                id: "pom-ubp-2026",
                role: "Panitia Divisi Registrasi",
                organization: "BEM FIK — Pekan Olahraga Mahasiswa (POM) 2026",
                period: "Jul – Sep 2026",
                location: "Universitas Buana Perjuangan Karawang",
                description:
                    "Berperan aktif dalam administrasi peserta dan kelancaran kompetisi olahraga serta e-sports tingkat universitas.",
                highlights: [
                    "Mengelola proses pendataan, verifikasi berkas, dan registrasi panitia serta peserta kompetisi.",
                    "Turut membantu kelancaran jadwal dan teknis pertandingan cabang Badminton Ganda Putra serta turnamen Mobile Legends.",
                ],
                photos: [
                    {
                        url: "/images/org/PomBadmin.jpeg",
                        label: "01_turnamen_badminton.jpeg",
                        caption: "Pelaksanaan pertandingan Badminton Pekan Olahraga Mahasiswa 2026",
                    },
                    {
                        url: "/images/org/Pom-ML.jpeg",
                        label: "02_turnamen_mobile_legends.jpeg",
                        caption: "Pelaksanaan turnamen Mobile Legends Pekan Olahraga Mahasiswa 2026",
                    },
                ],
            },
        ] as OrgExperienceItem[],
        contact: SHARED_DATA.contact,
    },

    en: {
        profile: {
            ...SHARED_DATA.profileBase,
            major: "Informatics Engineering",
            location: "Karawang, West Java, Indonesia",
            bio: "Informatics Engineering student at Universitas Buana Perjuangan Karawang focused on building modern web applications, cross-platform mobile apps, and exploring Linux environments. Experienced in delivering end-to-end software solutions from relational database design and REST API development to clean, responsive user interfaces.\n\nExperienced in building practical applications and digital products ranging from a learning marketplace and a Google Play-published Android casual game to productivity tools while actively developing leadership and cross-team coordination in student organizations and event committees. Open to internship opportunities, freelance work, and software development collaborations.",
        },
        skills: SHARED_DATA.skills,
        projects: [
            {
                id: "eduvan",
                title: "EduVan — Learning Marketplace Platform",
                category: "Full-Stack",
                description:
                    "A full-stack learning marketplace platform connecting mentors and students with class management, payment transactions, and mobile app integration.",
                techStack: ["Laravel", "Ionic", "Angular", "TypeScript", "MySQL"],
                demoUrl: "https://play.google.com/store/apps/details?id=com.rehalivan.eduvan&pcampaignid=web_share",
                featured: true,
            },
            {
                id: "bottleflip",
                title: "BottleFlipMaster",
                category: "Mobile App",
                description:
                    "An Android casual arcade game that completed closed testing and was officially published on the Google Play Store.",
                techStack: ["Ionic", "TypeScript", "Capacitor"],
                demoUrl: "https://play.google.com/store/apps/details?id=com.rehalivan.bottleflip&pcampaignid=web_share",
            },
            {
                id: "tracking",
                title: "Study Progress Tracker",
                category: "Backend",
                description: "A web application to monitor study milestones and academic productivity reminders.",
                techStack: ["PHP", "HTML", "CSS", "JavaScript", "MySQL"],
                githubUrl: "https://github.com/HaikalAjiPrabowo/trackingprogressbelajar.git",
            },
            {
                id: "skill",
                title: "Skill-Swap — Peer-to-Peer Skill Exchange App",
                category: "Mobile App",
                description:
                    "A collaborative platform to find learning partners and exchange skills directly (peer-to-peer) with interest-based matching and session scheduling. Currently in active development and launching soon.",
                techStack: ["Ionic", "TypeScript", "HTML", "SCSS"],
                inDevelopment: true,
            },
        ] as ProjectItem[],
        organizations: [
            {
                id: "bem-fik",
                role: "Member of Talent & Interest Division (MINBA)",
                organization: "BEM FIK — Student Executive Board",
                period: "2026 – 2027",
                location: "Universitas Buana Perjuangan Karawang",
                description:
                    "Actively planning and executing student programs to nurture academic and non-academic talents across the Faculty of Computer Science.",
                highlights: [
                    "Contributed to organizing talent development programs, student competitions, and inter-faculty networking events.",
                ],
                photos: [
                    {
                        url: "/images/org/rendy.jpeg",
                        label: "01_bem_fik_activity.jpeg",
                        caption: "BEM FIK UBP Karawang student organization activities",
                    },
                ],
            },
            {
                id: "inaugurasi-fik-2026",
                role: "Chief Executive (Ketua Pelaksana)",
                organization: "Faculty of Computer Science Inauguration 2026",
                period: "Nov 2026",
                location: "Ranca Upas, Bandung",
                description:
                    "Led end-to-end event planning, cross-division coordination, budgeting, and on-site execution for the Faculty of Computer Science freshman inauguration.",
                highlights: [
                    "Coordinated dozens of committee members across multiple divisions from preparation through event day.",
                    "Managed logistics, venue permits, and smooth execution of all outdoor camp activities in Ranca Upas.",
                ],
                photos: [
                    {
                        url: "/images/org/Inau-banner.jpeg",
                        label: "01_event_banner.jpeg",
                        caption: "Inaugurasi FIK 2026 event documentation at Ranca Upas",
                    },
                    {
                        url: "/images/org/pengukuhan.jpeg",
                        label: "02_induction_ceremony.jpeg",
                        caption: "Faculty of Computer Science student induction ceremony",
                    },
                    {
                        url: "/images/org/Pembukaan.jpeg",
                        label: "03_opening_session.jpeg",
                        caption: "Opening and welcoming session of Inaugurasi FIK 2026",
                    },
                    {
                        url: "/images/org/Pulang-Inau.jpeg",
                        label: "04_closing_departure.jpeg",
                        caption: "Closing and departure documentation of Inaugurasi FIK 2026",
                    },
                ],
            },
            {
                id: "pom-ubp-2026",
                role: "Registration Division Committee",
                organization: "BEM FIK — Student Sports Week (POM) 2026",
                period: "Jul – Sep 2026",
                location: "Universitas Buana Perjuangan Karawang",
                description:
                    "Handled participant administration and match operations for university-wide sports and e-sports tournaments.",
                highlights: [
                    "Managed data collection, document verification, and registration for committee members and tournament participants.",
                    "Assisted match scheduling and technical operations for Men's Doubles Badminton and Mobile Legends tournaments.",
                ],
                photos: [
                    {
                        url: "/images/org/PomBadmin.jpeg",
                        label: "01_badminton_match.jpeg",
                        caption: "Badminton tournament match during Student Sports Week 2026",
                    },
                    {
                        url: "/images/org/Pom-ML.jpeg",
                        label: "02_mobile_legends_match.jpeg",
                        caption: "Mobile Legends tournament during Student Sports Week 2026",
                    },
                ],
            },
        ] as OrgExperienceItem[],
        contact: SHARED_DATA.contact,
    },
};

export function getPortfolioData(lang: Locale) {
    return DATA_BY_LOCALE[lang] ?? DATA_BY_LOCALE.id;
}

export const PORTFOLIO_DATA = DATA_BY_LOCALE.id;
