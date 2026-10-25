import express from "express";
import { createServer as createViteServer } from "vite";

const CONSUMET_API = "https://api.consumet.org/anime/gogoanime";

export interface AnimeEpisodeData {
  id: string;
  number: number;
  title: string;
  duration: string;
  thumbnail: string;
  airDate?: string;
}

export interface AnimeCharacterData {
  id: string;
  name: string;
  role: string;
  image: string;
  voiceActor?: string;
}

export interface AnimeData {
  id: string;
  title: string;
  romajiTitle?: string;
  genres: string[];
  rating: number;
  totalEpisodes: number;
  releaseDate: string;
  season?: string;
  studio: string;
  status: "Ongoing" | "Completed";
  description: string;
  type: "TV" | "Movie" | "ONA";
  image: string;     // portrait poster
  cover: string;     // widescreen backdrop banner
  color: string;
  featured?: boolean;
  characters?: AnimeCharacterData[];
  episodes?: AnimeEpisodeData[];
}

const OFFICIAL_ANIME_LIST: AnimeData[] = [
  {
    id: "dandadan",
    title: "Dan Da Dan",
    romajiTitle: "Dandadan",
    genres: ["Action", "Comedy", "Supernatural", "Sci-Fi"],
    rating: 8.85,
    totalEpisodes: 12,
    releaseDate: "Fall 2024",
    season: "Fall 2024",
    studio: "Science SARU",
    status: "Ongoing",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-60q1B6GK2Ghb.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-SpwPNAduszXl.jpg",
    color: "#e47850",
    featured: true,
    description: "Momo Ayase is a high school girl who believes in ghosts but denies aliens, while her classmate Ken Takakura (nicknamed Okarun) believes in aliens but rejects ghosts. To prove each other wrong, they visit haunted hotspots—igniting a chaotic, high-voltage supernatural adventure where curses and extra-terrestrials collide.",
    characters: [
      { id: "momo", name: "Momo Ayase", role: "Main Protagonist", image: "https://s4.anilist.co/file/anilistcdn/character/large/b304677-Yg2bQ89F3n1r.png", voiceActor: "Shion Wakayama" },
      { id: "okarun", name: "Ken 'Okarun' Takakura", role: "Main Protagonist", image: "https://s4.anilist.co/file/anilistcdn/character/large/b304678-B2fG89jU3n1q.png", voiceActor: "Natsuki Hanae" },
      { id: "turbo-granny", name: "Turbo Granny", role: "Yokai Spirit", image: "https://s4.anilist.co/file/anilistcdn/character/large/b304679-Z1pG38kM1n4p.png", voiceActor: "Mayumi Tanaka" },
      { id: "seiko", name: "Seiko Ayase", role: "Spirit Medium", image: "https://s4.anilist.co/file/anilistcdn/character/large/b304680-R9tU41nM2v8l.png", voiceActor: "Nana Mizuki" }
    ],
    episodes: [
      { id: "dandadan-episode-1", number: 1, title: "That's How Love Starts, Ya Know!", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-SpwPNAduszXl.jpg", airDate: "Oct 4, 2024" },
      { id: "dandadan-episode-2", number: 2, title: "That's a Space Alien, Ain't It?", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-60q1B6GK2Ghb.jpg", airDate: "Oct 11, 2024" },
      { id: "dandadan-episode-3", number: 3, title: "Clash of the Turbo Granny!", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-SpwPNAduszXl.jpg", airDate: "Oct 18, 2024" },
      { id: "dandadan-episode-4", number: 4, title: "Let's Kick Some Ghost Ass!", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-60q1B6GK2Ghb.jpg", airDate: "Oct 25, 2024" },
      { id: "dandadan-episode-5", number: 5, title: "Where Are Your Family Jewels?", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-SpwPNAduszXl.jpg", airDate: "Nov 1, 2024" },
      { id: "dandadan-episode-6", number: 6, title: "A Dangerous Woman Has Arrived", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-60q1B6GK2Ghb.jpg", airDate: "Nov 8, 2024" }
    ]
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    romajiTitle: "Jujutsu Kaisen",
    genres: ["Action", "Dark Fantasy", "Supernatural"],
    rating: 8.92,
    totalEpisodes: 47,
    releaseDate: "Fall 2020",
    season: "Shibuya Incident",
    studio: "MAPPA",
    status: "Completed",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
    color: "#e45d5d",
    featured: true,
    description: "Idly indulging in paranormal activities with the Occult Club, high schooler Yuji Itadori spends his days either at the clubroom or the hospital visiting his bedridden grandfather. When a sealed cursed talisman is unraveled, Yuji swallows Sukuna's finger to save his friends, thrusting him into the perilous domain of Jujutsu Sorcery.",
    characters: [
      { id: "gojo", name: "Satoru Gojo", role: "Special Grade Sorcerer", image: "https://s4.anilist.co/file/anilistcdn/character/large/b127571-R4H3K7M01s.png", voiceActor: "Yuichi Nakamura" },
      { id: "yuji", name: "Yuji Itadori", role: "Sukuna Vessel", image: "https://s4.anilist.co/file/anilistcdn/character/large/b127572-T5U1G2F73s.png", voiceActor: "Junya Enoki" },
      { id: "megumi", name: "Megumi Fushiguro", role: "Ten Shadows Sorcerer", image: "https://s4.anilist.co/file/anilistcdn/character/large/b127573-A8X9K4P22s.png", voiceActor: "Yuma Uchida" },
      { id: "nobara", name: "Nobara Kugisaki", role: "Straw Doll Sorcerer", image: "https://s4.anilist.co/file/anilistcdn/character/large/b127574-F2D7R9M11s.png", voiceActor: "Asami Seto" }
    ],
    episodes: [
      { id: "jujutsu-kaisen-episode-1", number: 1, title: "Ryomen Sukuna", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg" },
      { id: "jujutsu-kaisen-episode-2", number: 2, title: "For Myself", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg" },
      { id: "jujutsu-kaisen-episode-3", number: 3, title: "Girl of Steel", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg" },
      { id: "jujutsu-kaisen-episode-4", number: 4, title: "Curse Womb Must Die", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg" }
    ]
  },
  {
    id: "frieren",
    title: "Frieren: Beyond Journey's End",
    romajiTitle: "Sousou no Frieren",
    genres: ["Adventure", "Drama", "Fantasy"],
    rating: 9.38,
    totalEpisodes: 28,
    releaseDate: "Fall 2023",
    season: "Fall 2023",
    studio: "Madhouse",
    status: "Completed",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg",
    color: "#a7f3d0",
    featured: true,
    description: "The Demon King has been vanquished, and the victorious hero party disbands after returning peace to the realm. The elf mage Frieren, having a lifespan of millennia, witnesses her companions age and pass away. Regretting not knowing them deeper, she embarks on a poignant new pilgrimage across the world to understand the human heart.",
    characters: [
      { id: "frieren", name: "Frieren", role: "Elven Mage", image: "https://s4.anilist.co/file/anilistcdn/character/large/b176754-5sFq9L2z.png", voiceActor: "Atsumi Tanezaki" },
      { id: "fern", name: "Fern", role: "Mage Apprentice", image: "https://s4.anilist.co/file/anilistcdn/character/large/b176755-1mK8W3rT.png", voiceActor: "Kana Ichinose" },
      { id: "stark", name: "Stark", role: "Warrior", image: "https://s4.anilist.co/file/anilistcdn/character/large/b176756-3uN7V9qX.png", voiceActor: "Chiaki Kobayashi" },
      { id: "himmel", name: "Himmel the Hero", role: "Hero of the Realm", image: "https://s4.anilist.co/file/anilistcdn/character/large/b176757-7gT4P1sZ.png", voiceActor: "Nobuhiko Okamoto" }
    ],
    episodes: [
      { id: "frieren-episode-1", number: 1, title: "The Journey's End", duration: "25m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg" },
      { id: "frieren-episode-2", number: 2, title: "It Didn't Have to Be Magic...", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg" },
      { id: "frieren-episode-3", number: 3, title: "Killing Magic (Zoltraak)", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg" }
    ]
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    romajiTitle: "Chainsaw Man",
    genres: ["Action", "Gore", "Supernatural", "Dark Fantasy"],
    rating: 8.65,
    totalEpisodes: 12,
    releaseDate: "Fall 2022",
    season: "Fall 2022",
    studio: "MAPPA",
    status: "Completed",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-DdP4vAdssLoz.png",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-o8IRwCGVr9KW.jpg",
    color: "#ef4444",
    featured: true,
    description: "Denji has a simple dream—to live a comfortable life, eating toast with jam and romancing a girl he likes. Instead, he's drowning in debt left by his dead father, working as a devil hunter alongside Pochita, the Chainsaw Devil. When betrayed and butchered, Pochita fuses with his heart, resurrecting Denji as Chainsaw Man.",
    characters: [
      { id: "denji", name: "Denji", role: "Chainsaw Hybrid", image: "https://s4.anilist.co/file/anilistcdn/character/large/b130138-0mH2L7P1.png", voiceActor: "Kikunosuke Toya" },
      { id: "makima", name: "Makima", role: "Public Safety Division 4", image: "https://s4.anilist.co/file/anilistcdn/character/large/b130139-4yG8M1qR.png", voiceActor: "Tomori Kusunoki" },
      { id: "power", name: "Power", role: "Blood Fiend", image: "https://s4.anilist.co/file/anilistcdn/character/large/b130140-9xK3R5zW.png", voiceActor: "Fairouz Ai" },
      { id: "aki", name: "Aki Hayakawa", role: "Public Safety Officer", image: "https://s4.anilist.co/file/anilistcdn/character/large/b130141-2wN6T8vB.png", voiceActor: "Shogo Sakata" }
    ],
    episodes: [
      { id: "chainsaw-man-episode-1", number: 1, title: "Dog & Chainsaw", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-o8IRwCGVr9KW.jpg" },
      { id: "chainsaw-man-episode-2", number: 2, title: "Arrival in Tokyo", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-DdP4vAdssLoz.png" }
    ]
  },
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    romajiTitle: "Ore dake Level Up na Ken",
    genres: ["Action", "Adventure", "Fantasy"],
    rating: 8.52,
    totalEpisodes: 12,
    releaseDate: "Winter 2024",
    season: "Winter 2024",
    studio: "A-1 Pictures",
    status: "Ongoing",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg",
    color: "#38bdf8",
    featured: true,
    description: "Known disparagingly as the 'Weakest Hunter of All Mankind', E-Rank Hunter Sung Jinwoo struggles through low-tier raids just to pay his mother's medical bills. Trapped in a lethal double dungeon and facing death, he awakens a mysterious quest system only visible to him—granting him the unprecedented power to level up infinitely.",
    characters: [
      { id: "jinwoo", name: "Sung Jinwoo", role: "Shadow Monarch", image: "https://s4.anilist.co/file/anilistcdn/character/large/b151807-main.png", voiceActor: "Taito Ban" },
      { id: "cha-hae-in", name: "Cha Hae-in", role: "S-Rank Hunter", image: "https://s4.anilist.co/file/anilistcdn/character/large/b151807-cha.png", voiceActor: "Reina Ueda" }
    ],
    episodes: [
      { id: "solo-leveling-episode-1", number: 1, title: "I'm Used to It", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg" },
      { id: "solo-leveling-episode-2", number: 2, title: "If I Had One More Chance", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png" }
    ]
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    romajiTitle: "Kimetsu no Yaiba",
    genres: ["Action", "Historical", "Supernatural"],
    rating: 8.84,
    totalEpisodes: 55,
    releaseDate: "Spring 2019",
    season: "Hashira Training Arc",
    studio: "ufotable",
    status: "Ongoing",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg",
    color: "#f59e0b",
    description: "Tanjiro Kamado lives a peaceful life selling charcoal until demons slaughter his entire family. His sister Nezuko is the sole survivor, but has been transformed into a demon herself. Tanjiro takes up the sword as a Demon Slayer, determined to avenge his family and cure his sister.",
    episodes: [
      { id: "demon-slayer-episode-1", number: 1, title: "Cruelty", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg" },
      { id: "demon-slayer-episode-2", number: 2, title: "Trainer Sakonji Urokodaki", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg" }
    ]
  },
  {
    id: "one-piece",
    title: "One Piece",
    romajiTitle: "One Piece",
    genres: ["Action", "Adventure", "Fantasy", "Comedy"],
    rating: 8.95,
    totalEpisodes: 1120,
    releaseDate: "Fall 1999",
    season: "Egghead Island Arc",
    studio: "Toei Animation",
    status: "Ongoing",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-ELSYx3yMPcKM.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg",
    color: "#f97316",
    description: "Monkey D. Luffy refuses to let anyone or anything stand in the way of his quest to become the King of All Pirates. Charting a course for the treacherous waters of the Grand Line, Luffy and his loyal Straw Hat crew search for the ultimate treasure: the One Piece.",
    episodes: [
      { id: "one-piece-episode-1100", number: 1100, title: "Powers on a Different Level! Luffy vs. Lucci!", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg" },
      { id: "one-piece-episode-1101", number: 1101, title: "The Strongest Form of Humanity! The Seraphim!", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-ELSYx3yMPcKM.jpg" }
    ]
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    romajiTitle: "Shingeki no Kyojin",
    genres: ["Action", "Drama", "Mystery", "Military"],
    rating: 9.15,
    totalEpisodes: 87,
    releaseDate: "Spring 2013",
    season: "The Final Season",
    studio: "MAPPA / Wit Studio",
    status: "Completed",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg",
    color: "#f59e0b",
    description: "Centuries ago, mankind was slaughtered to near extinction by monstrous humanoid creatures called Titans, forcing humans to hide behind enormous concentric walls. When a Colossal Titan breaches the outer barrier, young Eren Yeager dedicates his life to eradicating every single Titan.",
    episodes: [
      { id: "attack-on-titan-episode-1", number: 1, title: "To You, in 2000 Years", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg" },
      { id: "attack-on-titan-episode-2", number: 2, title: "That Day: The Fall of Shiganshina", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg" }
    ]
  },
  {
    id: "vinland-saga",
    title: "Vinland Saga",
    romajiTitle: "Vinland Saga",
    genres: ["Action", "Adventure", "Drama", "Historical"],
    rating: 8.90,
    totalEpisodes: 48,
    releaseDate: "Summer 2019",
    season: "Season 2",
    studio: "MAPPA / Wit Studio",
    status: "Completed",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101348-2fhDFPCuMNiz.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101348-pivKKffCAwAY.jpg",
    color: "#f43f5e",
    description: "Raised among Viking raiders after the tragic death of his father, young Thorfinn dedicates his youth to dueling his father's murderer, Askeladd. As wars over the crown of England escalate, Thorfinn must confront the cycle of violence and seek the peaceful haven of Vinland.",
    episodes: [
      { id: "vinland-saga-episode-1", number: 1, title: "Somewhere Not Here", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101348-pivKKffCAwAY.jpg" }
    ]
  },
  {
    id: "bleach-tybw",
    title: "Bleach: Thousand-Year Blood War",
    romajiTitle: "Bleach: Sennen Kessen-hen",
    genres: ["Action", "Adventure", "Supernatural"],
    rating: 8.98,
    totalEpisodes: 39,
    releaseDate: "Fall 2022",
    season: "The Conflict",
    studio: "Pierrot",
    status: "Ongoing",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx116674-p3zK4PUX2Aag.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/116674-l2YlIyJzvGSV.jpg",
    color: "#6366f1",
    description: "The peace is abruptly broken when warning sirens blare through the Soul Society. Residents disappear without a trace, and a dark shadow reaches toward Ichigo Kurosaki and his friends in Karakura Town. The Quincy empire Wandenreich declares all-out war upon the Soul Reapers.",
    episodes: [
      { id: "bleach-tybw-episode-1", number: 1, title: "The Blood Warfare", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/116674-l2YlIyJzvGSV.jpg" }
    ]
  },
  {
    id: "cyberpunk-edgerunners",
    title: "Cyberpunk: Edgerunners",
    romajiTitle: "Cyberpunk: Edgerunners",
    genres: ["Action", "Sci-Fi", "Cyberpunk", "Drama"],
    rating: 8.78,
    totalEpisodes: 10,
    releaseDate: "Fall 2022",
    season: "Limited Series",
    studio: "Studio Trigger",
    status: "Completed",
    type: "ONA",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx120377-ayZPoxiWt4Li.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/120377-c15oLS8CA31s.jpg",
    color: "#10b981",
    description: "In a neon-drenched dystopia riddled with corruption and cybernetic implants, a gifted but reckless street kid named David Martinez loses everything. To survive in Night City, he becomes an edgerunner: a mercenary outlaw navigating high-stakes corporate warfare alongside netrunner Lucy.",
    episodes: [
      { id: "cyberpunk-edgerunners-episode-1", number: 1, title: "Let You Down", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/120377-c15oLS8CA31s.jpg" },
      { id: "cyberpunk-edgerunners-episode-2", number: 2, title: "Like a Boy", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx120377-ayZPoxiWt4Li.jpg" }
    ]
  },
  {
    id: "kaiju-no-8",
    title: "Kaiju No. 8",
    romajiTitle: "Kaijuu 8-gou",
    genres: ["Action", "Sci-Fi", "Military", "Comedy"],
    rating: 8.41,
    totalEpisodes: 12,
    releaseDate: "Spring 2024",
    season: "Spring 2024",
    studio: "Production I.G",
    status: "Ongoing",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153288-25FBfFJzEQ5O.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg",
    color: "#22c55e",
    description: "Kafka Hibino had always dreamed of joining the Japan Defense Force to defeat giant Kaiju alongside his childhood friend Mina Ashiro. Relegated to the cleanup crew disposing of monster carcasses, a parasite abruptly enters his mouth, granting him the terrifying power to transform into Kaiju No. 8.",
    episodes: [
      { id: "kaiju-no-8-episode-1", number: 1, title: "The Man Who Became a Monster", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg" }
    ]
  },
  {
    id: "spy-x-family",
    title: "Spy x Family",
    romajiTitle: "SPY x FAMILY",
    genres: ["Action", "Comedy", "Slice of Life"],
    rating: 8.58,
    totalEpisodes: 37,
    releaseDate: "Spring 2022",
    season: "Season 2",
    studio: "Wit Studio / CloverWorks",
    status: "Completed",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-Kb6R5nYQfjmP.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg",
    color: "#06b6d4",
    description: "To maintain fragile peace between rival nations, master spy 'Twilight' must construct an undercover cover family. He unknowingly adopts Anya, a telepathic orphan girl, and marries Yor, a lethal assassin. None know each other's secret identities in this hilarious and heartwarming family dynamic.",
    episodes: [
      { id: "spy-x-family-episode-1", number: 1, title: "Operation Strix", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg" }
    ]
  },
  {
    id: "oshi-no-ko",
    title: "Oshi no Ko",
    romajiTitle: "Oshi no Ko",
    genres: ["Drama", "Mystery", "Supernatural"],
    rating: 8.75,
    totalEpisodes: 24,
    releaseDate: "Spring 2023",
    season: "Season 2",
    studio: "Doga Kobo",
    status: "Ongoing",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150672-WqmmwZ4nMzAy.png",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/150672-ISwoA0eS722H.jpg",
    color: "#ec4899",
    description: "Sixteen-year-old Ai Hoshino is a talented idol adored by her fans. When country gynecologist Gorou Amemiya is murdered right before delivering her secret twins, he reincarnates as Aqua, Ai's newborn son. Behind the dazzling lights of showbiz lies a dark web of secrets.",
    episodes: [
      { id: "oshi-no-ko-episode-1", number: 1, title: "Mother and Children", duration: "82m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/150672-ISwoA0eS722H.jpg" }
    ]
  },
  {
    id: "death-note",
    title: "Death Note",
    romajiTitle: "Death Note",
    genres: ["Mystery", "Psychological", "Supernatural", "Thriller"],
    rating: 8.62,
    totalEpisodes: 37,
    releaseDate: "Fall 2006",
    season: "Classic",
    studio: "Madhouse",
    status: "Completed",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-kUgkcrfOrkUM.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg",
    color: "#a855f7",
    description: "Brilliant high school prodigy Light Yagami finds a notebook dropped by a Shinigami death god named Ryuk. Any human whose name is written in the notebook dies. Light resolves to eliminate all criminals and reign as a god, drawing the pursuit of the eccentric master detective known only as L.",
    episodes: [
      { id: "death-note-episode-1", number: 1, title: "Rebirth", duration: "23m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg" }
    ]
  },
  {
    id: "fmab",
    title: "Fullmetal Alchemist: Brotherhood",
    romajiTitle: "Hagane no Renkinjutsushi: Fullmetal Alchemist",
    genres: ["Action", "Adventure", "Drama", "Fantasy"],
    rating: 9.10,
    totalEpisodes: 64,
    releaseDate: "Spring 2009",
    season: "Classic",
    studio: "Bones",
    status: "Completed",
    type: "TV",
    image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-nSWCgQlmOMtj.jpg",
    cover: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg",
    color: "#eab308",
    description: "After a disastrous human transmutation attempting to resurrect their deceased mother, Edward Elric loses his arm and leg, while his brother Alphonse loses his entire body. Binding Al's soul to a suit of armor, the brothers search for the legendary Philosopher's Stone to restore their bodies.",
    episodes: [
      { id: "fmab-episode-1", number: 1, title: "Fullmetal Alchemist", duration: "24m", thumbnail: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg" }
    ]
  }
];

const smartFetch = async (url: string): Promise<any> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) return null;
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) return null;
    return await response.json();
  } catch {
    return null;
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Proxy API Routes
  app.get("/api/trending", async (_req, res) => {
    let data = await smartFetch(`${CONSUMET_API}/top-airing`);
    if (!data || !data.results || data.results.length === 0) {
      data = {
        currentPage: 1,
        hasNextPage: false,
        results: OFFICIAL_ANIME_LIST
      };
    } else {
      // Enrich Consumet results with real cover artwork
      data.results = data.results.map((item: any) => {
        const match = OFFICIAL_ANIME_LIST.find(o => 
          item.title?.toLowerCase?.().includes(o.title.toLowerCase()) || 
          o.title.toLowerCase().includes(item.title?.toLowerCase?.())
        );
        return {
          ...item,
          image: match ? match.image : item.image,
          cover: match ? match.cover : (item.cover || item.image)
        };
      });
    }
    res.json(data);
  });

  app.get("/api/recent", async (_req, res) => {
    let data = await smartFetch(`${CONSUMET_API}/recent-episodes`);
    if (!data || !data.results || data.results.length === 0) {
      data = {
        currentPage: 1,
        hasNextPage: false,
        results: OFFICIAL_ANIME_LIST.slice(0, 8).map((anime, idx) => ({
          ...anime,
          episodeId: `${anime.id}-episode-${idx + 1}`,
          episodeNumber: idx + 1,
          episodeTitle: anime.episodes?.[0]?.title || `Episode ${idx + 1}`
        }))
      };
    } else {
      data.results = data.results.map((item: any) => {
        const match = OFFICIAL_ANIME_LIST.find(o => 
          item.title?.toLowerCase?.().includes(o.title.toLowerCase()) || 
          o.title.toLowerCase().includes(item.title?.toLowerCase?.())
        );
        return {
          ...item,
          image: match ? match.image : item.image,
          cover: match ? match.cover : (item.cover || item.image)
        };
      });
    }
    res.json(data);
  });

  app.get("/api/search", async (req, res) => {
    const query = req.query.query;
    if (!query) return res.status(400).json({ error: "Query is required" });
    
    let data = await smartFetch(`${CONSUMET_API}/${encodeURIComponent(query as string)}`);
    if (!data || !data.results || data.results.length === 0) {
      const q = (query as string).toLowerCase().trim();
      const filtered = OFFICIAL_ANIME_LIST.filter(anime => 
        anime.title.toLowerCase().includes(q) ||
        anime.romajiTitle?.toLowerCase().includes(q) ||
        anime.genres.some(g => g.toLowerCase().includes(q)) ||
        anime.description.toLowerCase().includes(q)
      );
      data = {
        currentPage: 1,
        hasNextPage: false,
        results: filtered
      };
    }
    res.json(data);
  });

  app.get("/api/info/:id", async (req, res) => {
    const id = req.params.id;
    let data = await smartFetch(`${CONSUMET_API}/info/${id}`);
    if (!data || !data.id) {
      const anime = OFFICIAL_ANIME_LIST.find(a => a.id === id) || OFFICIAL_ANIME_LIST[0];
      
      const episodes = anime.episodes && anime.episodes.length > 0 
        ? anime.episodes 
        : Array.from({ length: Math.min(anime.totalEpisodes || 12, 12) }, (_, i) => ({
            id: `${anime.id}-episode-${i + 1}`,
            number: i + 1,
            title: `Episode ${i + 1}`,
            duration: "24m",
            thumbnail: anime.cover
          }));

      data = {
        ...anime,
        episodes
      };
    } else {
      const match = OFFICIAL_ANIME_LIST.find(o => o.id === id || data.title?.toLowerCase?.().includes(o.title.toLowerCase()));
      if (match) {
        data.image = match.image;
        data.cover = match.cover;
        data.characters = match.characters;
      }
    }
    res.json(data);
  });

  app.get("/api/watch/:episodeId", async (req, res) => {
    const episodeId = req.params.episodeId;
    let data = await smartFetch(`${CONSUMET_API}/watch/${episodeId}`);
    if (!data || !data.sources || data.sources.length === 0) {
      data = {
        headers: {
          Referer: "https://gogoplay.46516.info"
        },
        sources: [
          {
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            isM3U8: false,
            quality: "1080p Ultra HD"
          },
          {
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            isM3U8: false,
            quality: "720p HD"
          },
          {
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
            isM3U8: false,
            quality: "480p SD"
          }
        ],
        subtitles: [
          { lang: "English", url: "" },
          { lang: "Spanish", url: "" },
          { lang: "French", url: "" }
        ]
      };
    }
    res.json(data);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Anime Streaming Server running on http://localhost:${PORT}`);
  });
}

startServer();
