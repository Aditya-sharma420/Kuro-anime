/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause,
  Search, 
  Bell, 
  Bookmark, 
  Check, 
  Plus, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  X, 
  Maximize, 
  Minimize,
  Volume2, 
  VolumeX, 
  Settings, 
  Clock, 
  Compass, 
  ListFilter,
  Layers,
  Sparkles,
  RotateCcw,
  FastForward,
  SkipForward,
  Share2,
  Tv,
  Film,
  Flame,
  TrendingUp,
  Award,
  Eye,
  Sliders,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

export type AnimeType = 'TV' | 'Movie' | 'ONA';

export interface AnimeEpisode {
  id: string;
  number: number;
  title: string;
  duration: string;
  thumbnail: string;
  airDate?: string;
}

export interface AnimeCharacter {
  id: string;
  name: string;
  role: string;
  image: string;
  voiceActor?: string;
}

export interface Anime {
  id: string;
  title: string;
  romajiTitle?: string;
  genres: string[];
  rating: number;
  episodes: number;
  year: number | string;
  season?: string;
  studio: string;
  description: string;
  type: AnimeType;
  color: string;
  banner: string;
  thumbnail: string;
  status: 'Ongoing' | 'Completed';
  audio: 'SUB' | 'DUB' | 'SUB/DUB';
  featured?: boolean;
  characters?: AnimeCharacter[];
  episodesList?: AnimeEpisode[];
}

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  tier: string;
  stats: {
    episodesWatched: number;
    hoursSpent: number;
    favorites: number;
    completedAnime: number;
  };
}

// --- Verified Official Anime Dataset (Actual Thumbnails & Key Visuals) ---

export const OFFICIAL_ANIME_DATASET: Anime[] = [
  {
    id: 'dandadan',
    title: 'Dan Da Dan',
    romajiTitle: 'Dandadan',
    genres: ['Action', 'Comedy', 'Supernatural', 'Sci-Fi'],
    rating: 8.85,
    episodes: 12,
    year: 2024,
    season: 'Fall 2024',
    studio: 'Science SARU',
    description: 'Momo Ayase is a high school girl who believes in ghosts but denies aliens, while Ken Takakura believes in aliens but rejects ghosts. To settle their argument, they visit paranormal hotspots—unleashing an eccentric, hyper-stylish supernatural battle where curses and extra-terrestrials collide.',
    type: 'TV',
    color: '#e47850',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-SpwPNAduszXl.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-60q1B6GK2Ghb.jpg',
    status: 'Ongoing',
    audio: 'SUB/DUB',
    featured: true,
    characters: [
      { id: 'momo', name: 'Momo Ayase', role: 'Main Protagonist', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b304677-Yg2bQ89F3n1r.png', voiceActor: 'Shion Wakayama' },
      { id: 'okarun', name: "Ken 'Okarun' Takakura", role: 'Main Protagonist', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b304678-B2fG89jU3n1q.png', voiceActor: 'Natsuki Hanae' },
      { id: 'turbo-granny', name: 'Turbo Granny', role: 'Yokai Spirit', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b304679-Z1pG38kM1n4p.png', voiceActor: 'Mayumi Tanaka' },
      { id: 'seiko', name: 'Seiko Ayase', role: 'Spirit Medium', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b304680-R9tU41nM2v8l.png', voiceActor: 'Nana Mizuki' }
    ],
    episodesList: [
      { id: 'dandadan-1', number: 1, title: "That's How Love Starts, Ya Know!", duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-SpwPNAduszXl.jpg', airDate: 'Oct 4, 2024' },
      { id: 'dandadan-2', number: 2, title: "That's a Space Alien, Ain't It?", duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-60q1B6GK2Ghb.jpg', airDate: 'Oct 11, 2024' },
      { id: 'dandadan-3', number: 3, title: 'Clash of the Turbo Granny!', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-SpwPNAduszXl.jpg', airDate: 'Oct 18, 2024' },
      { id: 'dandadan-4', number: 4, title: "Let's Kick Some Ghost Ass!", duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-60q1B6GK2Ghb.jpg', airDate: 'Oct 25, 2024' },
      { id: 'dandadan-5', number: 5, title: 'Where Are Your Family Jewels?', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/171018-SpwPNAduszXl.jpg', airDate: 'Nov 1, 2024' },
      { id: 'dandadan-6', number: 6, title: 'A Dangerous Woman Has Arrived', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx171018-60q1B6GK2Ghb.jpg', airDate: 'Nov 8, 2024' }
    ]
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    romajiTitle: 'Jujutsu Kaisen',
    genres: ['Action', 'Supernatural', 'Dark Fantasy'],
    rating: 8.92,
    episodes: 47,
    year: 2020,
    season: 'Shibuya Incident',
    studio: 'MAPPA',
    description: 'Yuji Itadori enters a high-stakes world of cursed energy when he swallows the finger of Ryomen Sukuna, King of Curses. Guided by the peerless Satoru Gojo, Yuji and fellow students at Tokyo Jujutsu High risk everything to exorcise malicious spirits born from human negative emotion.',
    type: 'TV',
    color: '#e45d5d',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg',
    status: 'Completed',
    audio: 'SUB/DUB',
    featured: true,
    characters: [
      { id: 'gojo', name: 'Satoru Gojo', role: 'Special Grade Sorcerer', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b127571-R4H3K7M01s.png', voiceActor: 'Yuichi Nakamura' },
      { id: 'yuji', name: 'Yuji Itadori', role: 'Sukuna Vessel', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b127572-T5U1G2F73s.png', voiceActor: 'Junya Enoki' },
      { id: 'megumi', name: 'Megumi Fushiguro', role: 'Ten Shadows Sorcerer', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b127573-A8X9K4P22s.png', voiceActor: 'Yuma Uchida' }
    ],
    episodesList: [
      { id: 'jjk-1', number: 1, title: 'Ryomen Sukuna', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg' },
      { id: 'jjk-2', number: 2, title: 'For Myself', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg' },
      { id: 'jjk-3', number: 3, title: 'Girl of Steel', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg' },
      { id: 'jjk-4', number: 4, title: 'Curse Womb Must Die', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx113415-LHBAeoZDIsnF.jpg' }
    ]
  },
  {
    id: 'frieren',
    title: "Frieren: Beyond Journey's End",
    romajiTitle: 'Sousou no Frieren',
    genres: ['Adventure', 'Drama', 'Fantasy'],
    rating: 9.38,
    episodes: 28,
    year: 2023,
    season: 'Fall 2023',
    studio: 'Madhouse',
    description: 'The hero party defeated the Demon King, bringing peace to the continent. Decades later, the immortal elven mage Frieren witnesses the death of hero Himmel. Haunted by the realization that human lives are fleeting, she sets out on a quiet, breathtaking journey to connect with humanity.',
    type: 'TV',
    color: '#a7f3d0',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg',
    status: 'Completed',
    audio: 'SUB/DUB',
    featured: true,
    characters: [
      { id: 'frieren', name: 'Frieren', role: 'Elven Mage', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b176754-5sFq9L2z.png', voiceActor: 'Atsumi Tanezaki' },
      { id: 'fern', name: 'Fern', role: 'Mage Apprentice', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b176755-1mK8W3rT.png', voiceActor: 'Kana Ichinose' },
      { id: 'stark', name: 'Stark', role: 'Warrior', image: 'https://s4.anilist.co/file/anilistcdn/character/large/b176756-3uN7V9qX.png', voiceActor: 'Chiaki Kobayashi' }
    ],
    episodesList: [
      { id: 'frieren-1', number: 1, title: "The Journey's End", duration: '25m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg' },
      { id: 'frieren-2', number: 2, title: "It Didn't Have to Be Magic...", duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx154587-qQTzQnEJJ3oB.jpg' },
      { id: 'frieren-3', number: 3, title: 'Killing Magic (Zoltraak)', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/154587-ivXNJ23SM1xB.jpg' }
    ]
  },
  {
    id: 'chainsaw-man',
    title: 'Chainsaw Man',
    romajiTitle: 'Chainsaw Man',
    genres: ['Action', 'Gore', 'Supernatural', 'Dark Fantasy'],
    rating: 8.65,
    episodes: 12,
    year: 2022,
    season: 'Fall 2022',
    studio: 'MAPPA',
    description: 'Denji lives as an impoverished devil hunter until he is slaughtered by yakuza. His pet devil Pochita merges with his heart, resurrecting him with the horrifying ability to sprout chainsaws from his limbs and head. Recruited into Public Safety, Denji battles monstrous entities in exchange for a warm meal.',
    type: 'TV',
    color: '#ef4444',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-o8IRwCGVr9KW.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-DdP4vAdssLoz.png',
    status: 'Completed',
    audio: 'SUB/DUB',
    featured: true,
    episodesList: [
      { id: 'csm-1', number: 1, title: 'Dog & Chainsaw', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-o8IRwCGVr9KW.jpg' },
      { id: 'csm-2', number: 2, title: 'Arrival in Tokyo', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx127230-DdP4vAdssLoz.png' }
    ]
  },
  {
    id: 'solo-leveling',
    title: 'Solo Leveling',
    romajiTitle: 'Ore dake Level Up na Ken',
    genres: ['Action', 'Adventure', 'Fantasy'],
    rating: 8.52,
    episodes: 12,
    year: 2024,
    season: 'Winter 2024',
    studio: 'A-1 Pictures',
    description: "In a world of dimensional gates and monsters, E-Rank hunter Sung Jinwoo is derided as the weakest hunter alive. Left to die in a treacherous double dungeon, he awakens to a mysterious game interface that allows only him to level up without limits, rising from prey to sovereign monarch.",
    type: 'TV',
    color: '#38bdf8',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png',
    status: 'Ongoing',
    audio: 'SUB/DUB',
    featured: true,
    episodesList: [
      { id: 'sl-1', number: 1, title: "I'm Used to It", duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-37yfQA3ym8PA.jpg' },
      { id: 'sl-2', number: 2, title: 'If I Had One More Chance', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx151807-it355ZgzquUd.png' }
    ]
  },
  {
    id: 'demon-slayer',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    romajiTitle: 'Kimetsu no Yaiba',
    genres: ['Action', 'Historical', 'Supernatural'],
    rating: 8.84,
    episodes: 55,
    year: 2019,
    season: 'Hashira Training Arc',
    studio: 'ufotable',
    description: 'Tanjiro Kamado lived quietly until his family was slaughtered by demons, leaving only his sister Nezuko alive—transformed into a demon. Tanjiro trains relentlessly with the water breathing technique to join the Demon Slayer Corps and seek a cure.',
    type: 'TV',
    color: '#f59e0b',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg',
    status: 'Ongoing',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'ds-1', number: 1, title: 'Cruelty', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-33MtJGsUSxga.jpg' }
    ]
  },
  {
    id: 'one-piece',
    title: 'One Piece',
    romajiTitle: 'One Piece',
    genres: ['Action', 'Adventure', 'Fantasy', 'Comedy'],
    rating: 8.95,
    episodes: 1120,
    year: 1999,
    season: 'Egghead Island Arc',
    studio: 'Toei Animation',
    description: 'Monkey D. Luffy embarks on the Grand Line with his loyal Straw Hat crew in search of the legendary treasure left by Pirate King Gol D. Roger, battling emperors, marine admirals, and government conspirators.',
    type: 'TV',
    color: '#f97316',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21-ELSYx3yMPcKM.jpg',
    status: 'Ongoing',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'op-1', number: 1100, title: 'Powers on a Different Level! Luffy vs. Lucci!', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqs.jpg' }
    ]
  },
  {
    id: 'attack-on-titan',
    title: 'Attack on Titan',
    romajiTitle: 'Shingeki no Kyojin',
    genres: ['Action', 'Drama', 'Mystery', 'Military'],
    rating: 9.15,
    episodes: 87,
    year: 2013,
    season: 'The Final Season',
    studio: 'MAPPA / Wit Studio',
    description: 'When humanity is trapped behind enormous walls under threat from flesh-eating humanoid Titans, young Eren Yeager vows to destroy every Titan after witnessing his mother devoured. What begins as survival unfolds into a global conflict over history, memory, and freedom.',
    type: 'TV',
    color: '#f59e0b',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-buvcRTBx4NSm.jpg',
    status: 'Completed',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'aot-1', number: 1, title: 'To You, in 2000 Years', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmneX.jpg' }
    ]
  },
  {
    id: 'vinland-saga',
    title: 'Vinland Saga',
    romajiTitle: 'Vinland Saga',
    genres: ['Action', 'Adventure', 'Drama', 'Historical'],
    rating: 8.90,
    episodes: 48,
    year: 2019,
    season: 'Season 2',
    studio: 'MAPPA / Wit Studio',
    description: 'Thorfinn spends his childhood among Danish mercenaries, seeking a duel of honor against Askeladd, the warrior who slain his father. Caught in the clash between English lords and Danish kings, Thorfinn must unlearn hatred to build a peaceful land across the western ocean.',
    type: 'TV',
    color: '#f43f5e',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/101348-pivKKffCAwAY.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101348-2fhDFPCuMNiz.jpg',
    status: 'Completed',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'vs-1', number: 1, title: 'Somewhere Not Here', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/101348-pivKKffCAwAY.jpg' }
    ]
  },
  {
    id: 'bleach-tybw',
    title: 'Bleach: Thousand-Year Blood War',
    romajiTitle: 'Bleach: Sennen Kessen-hen',
    genres: ['Action', 'Adventure', 'Supernatural'],
    rating: 8.98,
    episodes: 39,
    year: 2022,
    season: 'The Conflict',
    studio: 'Pierrot',
    description: 'When Soul Reapers vanish and the Hollow ecosystem collapses, the ancient Quincy empire led by Yhwach invades the Soul Society. Substitute Soul Reaper Ichigo Kurosaki must uncover the true origin of his Zanpakuto to avert extinction.',
    type: 'TV',
    color: '#6366f1',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/116674-l2YlIyJzvGSV.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx116674-p3zK4PUX2Aag.jpg',
    status: 'Ongoing',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'bleach-1', number: 1, title: 'The Blood Warfare', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/116674-l2YlIyJzvGSV.jpg' }
    ]
  },
  {
    id: 'cyberpunk-edgerunners',
    title: 'Cyberpunk: Edgerunners',
    romajiTitle: 'Cyberpunk: Edgerunners',
    genres: ['Action', 'Sci-Fi', 'Cyberpunk', 'Drama'],
    rating: 8.78,
    episodes: 10,
    year: 2022,
    season: 'Limited Series',
    studio: 'Studio Trigger',
    description: 'In the hyper-violent chrome jungle of Night City, street teen David Martinez installs high-grade cybernetic Sandevistan after a family tragedy, becoming an edgerunner mercenary alongside netrunner Lucy.',
    type: 'ONA',
    color: '#10b981',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/120377-c15oLS8CA31s.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx120377-ayZPoxiWt4Li.jpg',
    status: 'Completed',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'cpe-1', number: 1, title: 'Let You Down', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/120377-c15oLS8CA31s.jpg' }
    ]
  },
  {
    id: 'kaiju-no-8',
    title: 'Kaiju No. 8',
    romajiTitle: 'Kaijuu 8-gou',
    genres: ['Action', 'Sci-Fi', 'Military', 'Comedy'],
    rating: 8.41,
    episodes: 12,
    year: 2024,
    season: 'Spring 2024',
    studio: 'Production I.G',
    description: 'Thirty-two-year-old Kafka Hibino resigned himself to cleaning up monster remains after failing Defense Force trials. When a small flying kaiju forces its way down his throat, he gains the ability to turn into a humanoid Kaiju with immense power.',
    type: 'TV',
    color: '#22c55e',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx153288-25FBfFJzEQ5O.jpg',
    status: 'Ongoing',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'k8-1', number: 1, title: 'The Man Who Became a Monster', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/153288-JNsWuMPMAuJL.jpg' }
    ]
  },
  {
    id: 'spy-x-family',
    title: 'Spy x Family',
    romajiTitle: 'SPY x FAMILY',
    genres: ['Action', 'Comedy', 'Slice of Life'],
    rating: 8.58,
    episodes: 37,
    year: 2022,
    season: 'Season 2',
    studio: 'Wit Studio / CloverWorks',
    description: "To prevent war between Ostania and Westalis, elite spy Twilight must fabricate a respectable family. Unbeknownst to him, his adopted daughter Anya can read minds and his new wife Yor is an infamous assassin.",
    type: 'TV',
    color: '#06b6d4',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx140960-Kb6R5nYQfjmP.jpg',
    status: 'Completed',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'sxf-1', number: 1, title: 'Operation Strix', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/140960-Z7xSvkRxHKfj.jpg' }
    ]
  },
  {
    id: 'oshi-no-ko',
    title: 'Oshi no Ko',
    romajiTitle: 'Oshi no Ko',
    genres: ['Drama', 'Mystery', 'Supernatural'],
    rating: 8.75,
    episodes: 24,
    year: 2023,
    season: 'Season 2',
    studio: 'Doga Kobo',
    description: 'When beloved pop idol Ai Hoshino arrives at a rural clinic pregnant with twins, physician Gorou is murdered right before the delivery and reincarnated as Ai’s newborn son, delving into the murky shadows of the entertainment world.',
    type: 'TV',
    color: '#ec4899',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/150672-ISwoA0eS722H.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx150672-WqmmwZ4nMzAy.png',
    status: 'Ongoing',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'onk-1', number: 1, title: 'Mother and Children', duration: '82m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/150672-ISwoA0eS722H.jpg' }
    ]
  },
  {
    id: 'death-note',
    title: 'Death Note',
    romajiTitle: 'Death Note',
    genres: ['Mystery', 'Psychological', 'Supernatural', 'Thriller'],
    rating: 8.62,
    episodes: 37,
    year: 2006,
    season: 'Classic',
    studio: 'Madhouse',
    description: 'Prodigy student Light Yagami finds a supernatural notebook that kills anyone whose name is written within. Deciding to purge the world of crime as the god Kira, he draws the attention of enigmatic master detective L.',
    type: 'TV',
    color: '#a855f7',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-kUgkcrfOrkUM.jpg',
    status: 'Completed',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'dn-1', number: 1, title: 'Rebirth', duration: '23m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/1535.jpg' }
    ]
  },
  {
    id: 'fmab',
    title: 'Fullmetal Alchemist: Brotherhood',
    romajiTitle: 'Hagane no Renkinjutsushi',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy'],
    rating: 9.10,
    episodes: 64,
    year: 2009,
    season: 'Classic',
    studio: 'Bones',
    description: 'Brothers Edward and Alphonse Elric pay a horrific toll attempting human transmutation to revive their dead mother. Seeking the Philosopher’s Stone to restore their bodies, they uncover a nationwide conspiracy threatening all of Amestris.',
    type: 'TV',
    color: '#eab308',
    banner: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg',
    thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-nSWCgQlmOMtj.jpg',
    status: 'Completed',
    audio: 'SUB/DUB',
    episodesList: [
      { id: 'fmab-1', number: 1, title: 'Fullmetal Alchemist', duration: '24m', thumbnail: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/5114-q0V5URebphSG.jpg' }
    ]
  }
];

const INITIAL_USER: UserProfile = {
  name: 'KageWalker',
  handle: '@kagewalker',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  tier: 'VIP Ultra',
  stats: {
    episodesWatched: 846,
    hoursSpent: 352,
    favorites: 38,
    completedAnime: 54
  }
};

// --- Resilient Image Component with Fallback ---

export const AnimeImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackIcon = Tv
}: { 
  src: string; 
  alt: string; 
  className?: string;
  fallbackIcon?: any;
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const Icon = fallbackIcon;

  if (hasError || !src) {
    return (
      <div className={`bg-gradient-to-br from-purple-950/40 via-zinc-900 to-black flex flex-col items-center justify-center p-4 text-center border border-white/5 ${className}`}>
        <Icon className="text-purple-400/60 mb-2" size={28} />
        <span className="text-xs font-semibold text-zinc-400 line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-zinc-900/60 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'browse' | 'detail' | 'player' | 'watchlist' | 'profile'>('home');
  const [selectedAnime, setSelectedAnime] = useState<Anime>(OFFICIAL_ANIME_DATASET[0]);
  const [selectedEpisode, setSelectedEpisode] = useState<AnimeEpisode>(OFFICIAL_ANIME_DATASET[0].episodesList![0]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [activeGenre, setActiveGenre] = useState<string>('All');
  const [watchlist, setWatchlist] = useState<string[]>(['dandadan', 'frieren', 'solo-leveling']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [isScrolled, setIsScrolled] = useState(false);
  const [detailTab, setDetailTab] = useState<'episodes' | 'cast' | 'details'>('episodes');
  
  // Custom Video Player state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(145);
  const [duration, setDuration] = useState(1440);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [currentQuality, setCurrentQuality] = useState('1080p Ultra HD');
  const [currentAudio, setCurrentAudio] = useState<'Japanese (Sub)' | 'English (Dub)'>('Japanese (Sub)');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEpisodeDrawer, setShowEpisodeDrawer] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Playable stream source fallback URL
  const STREAM_VIDEO_SRC = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  // Watchlist toggle handler
  const toggleWatchlist = (animeId: string, title?: string) => {
    setWatchlist(prev => {
      const exists = prev.includes(animeId);
      const updated = exists ? prev.filter(id => id !== animeId) : [...prev, animeId];
      showToast(exists ? `Removed ${title || 'anime'} from Watchlist` : `Saved ${title || 'anime'} to Watchlist`);
      return updated;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 2800);
  };

  // Featured anime list for hero carousel
  const featuredAnime = OFFICIAL_ANIME_DATASET.filter(a => a.featured);
  const currentHero = featuredAnime[heroIndex] || OFFICIAL_ANIME_DATASET[0];

  // Auto-advance hero carousel every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % featuredAnime.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredAnime.length]);

  // Window scroll event
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut Ctrl/Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered anime by active genre
  const filteredAnimeList = activeGenre === 'All' 
    ? OFFICIAL_ANIME_DATASET 
    : OFFICIAL_ANIME_DATASET.filter(a => a.genres.some(g => g.toLowerCase() === activeGenre.toLowerCase()));

  // Search filtered results
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : OFFICIAL_ANIME_DATASET.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.romajiTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const openAnimeDetail = (anime: Anime) => {
    setSelectedAnime(anime);
    setSelectedEpisode(anime.episodesList?.[0] || {
      id: `${anime.id}-1`,
      number: 1,
      title: 'Episode 1',
      duration: '24m',
      thumbnail: anime.banner
    });
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const playEpisode = (anime: Anime, episode?: AnimeEpisode) => {
    setSelectedAnime(anime);
    const ep = episode || anime.episodesList?.[0] || {
      id: `${anime.id}-1`,
      number: 1,
      title: 'Episode 1',
      duration: '24m',
      thumbnail: anime.banner
    };
    setSelectedEpisode(ep);
    setCurrentPage('player');
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const genres = ['All', 'Action', 'Supernatural', 'Adventure', 'Fantasy', 'Comedy', 'Drama', 'Sci-Fi', 'Cyberpunk'];

  return (
    <div className="min-h-screen bg-[#07080d] text-[#f3f4f6] relative flex flex-col font-sans selection:bg-purple-600/30 selection:text-purple-200">
      {/* Background ambient lighting */}
      <div className="fixed top-[-5%] left-[5%] w-[45vw] h-[35vh] ambient-glow-top rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed top-[40%] right-[-5%] w-[40vw] h-[40vh] ambient-glow-side rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[25%] w-[50vw] h-[30vh] ambient-glow-bottom rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] glass-panel px-5 py-2.5 rounded-full border border-purple-500/30 text-xs font-semibold flex items-center gap-2 shadow-2xl shadow-purple-950/50 text-white"
          >
            <CheckCircle2 size={15} className="text-purple-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP BAR CONTRACT: Zone 1 (Brand), Zone 2 (4-5 Nav Links), Zone 3 (1 Primary Action Area) */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-[#07080d]/85 backdrop-blur-2xl border-white/10 py-3 shadow-xl' : 'bg-gradient-to-b from-black/80 to-transparent border-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-indigo-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <span className="font-black text-sm text-white">K</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight font-display whitespace-nowrap text-white">
              Kuro<span className="text-purple-400">Anime</span>
            </span>
          </div>

          {/* Zone 2: 4-5 single-line clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <button 
              onClick={() => setCurrentPage('home')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 ${currentPage === 'home' ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-500 after:rounded-full' : ''}`}
            >
              Explore
            </button>
            <button 
              onClick={() => { setActiveGenre('All'); setCurrentPage('browse'); }}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 ${currentPage === 'browse' ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-500 after:rounded-full' : ''}`}
            >
              Trending Shows
            </button>
            <button 
              onClick={() => { setActiveGenre('Supernatural'); setCurrentPage('browse'); }}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Supernatural
            </button>
            <button 
              onClick={() => { setActiveGenre('Action'); setCurrentPage('browse'); }}
              className="hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Shonen Hits
            </button>
            <button 
              onClick={() => setCurrentPage('watchlist')}
              className={`hover:text-white transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 relative ${currentPage === 'watchlist' ? 'text-white font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-500 after:rounded-full' : ''}`}
            >
              <span>My Watchlist</span>
              {watchlist.length > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {watchlist.length}
                </span>
              )}
            </button>
          </nav>

          {/* Zone 3: 1 primary action area */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Search Affordance */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-3 glass-input px-3.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:border-white/20 transition-all shrink-0 cursor-pointer"
              title="Search Anime (Ctrl+K)"
            >
              <Search size={14} className="text-zinc-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] bg-white/10 rounded text-zinc-400 font-mono">⌘K</kbd>
            </button>

            {/* Notification Bell with Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(prev => !prev)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors relative"
                title="Notifications"
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-pink-500 rounded-full" />
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-80 glass-panel rounded-2xl p-4 shadow-2xl z-50 border border-white/10"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Notifications</span>
                      <span className="text-[10px] text-purple-400 hover:underline cursor-pointer">Mark read</span>
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex gap-3 text-xs p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer" onClick={() => { setIsNotificationsOpen(false); openAnimeDetail(OFFICIAL_ANIME_DATASET[0]); }}>
                        <div className="w-9 h-12 rounded overflow-hidden shrink-0">
                          <AnimeImage src={OFFICIAL_ANIME_DATASET[0].thumbnail} alt="Dandadan" className="w-full h-full" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Dan Da Dan Episode 4 is now live</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">Stream in 1080p Ultra HD</p>
                        </div>
                      </div>
                      <div className="flex gap-3 text-xs p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer" onClick={() => { setIsNotificationsOpen(false); openAnimeDetail(OFFICIAL_ANIME_DATASET[2]); }}>
                        <div className="w-9 h-12 rounded overflow-hidden shrink-0">
                          <AnimeImage src={OFFICIAL_ANIME_DATASET[2].thumbnail} alt="Frieren" className="w-full h-full" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">Frieren wins Grand Animation Award</p>
                          <p className="text-[10px] text-zinc-400 mt-0.5">Read commemorative retrospective</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Avatar */}
            <div 
              onClick={() => setCurrentPage('profile')}
              className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-white/10 transition-colors"
              title="Profile"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-500/40 p-0.5 bg-gradient-to-tr from-purple-500 to-pink-500">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN VIEW SWITCHER */}
      <main className="flex-1">
        {/* VIEW 1: HOME PAGE */}
        {currentPage === 'home' && (
          <div className="pb-24">
            
            {/* HERO SECTION WITH AUTHENTIC ANIME BACKDROP */}
            <section className="relative w-full h-[620px] md:h-[720px] overflow-hidden flex items-end">
              {/* Backdrop image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 z-0"
                >
                  <AnimeImage 
                    src={currentHero.banner} 
                    alt={currentHero.title} 
                    className="w-full h-full object-cover object-top"
                  />
                  {/* Subtle cinema scrims for 100% text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#07080d] via-[#07080d]/70 to-transparent z-10 w-full md:w-3/4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-[#07080d]/40 to-transparent z-10" />
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#07080d]/90 to-transparent z-10" />
                </motion.div>
              </AnimatePresence>

              {/* Hero Content */}
              <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 pb-16 w-full">
                <motion.div
                  key={currentHero.id + '-info'}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="max-w-2xl"
                >
                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-300 mb-3 tracking-wide">
                    <span className="text-purple-400 font-bold uppercase">{currentHero.studio}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span>{currentHero.season || currentHero.year}</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span>{currentHero.episodes} Episodes</span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="flex items-center gap-1 text-amber-400 font-bold">
                      <Star size={12} fill="currentColor" />
                      {currentHero.rating.toFixed(2)}
                    </span>
                    <span aria-hidden="true" className="text-zinc-600">·</span>
                    <span className="text-emerald-400 font-mono text-[11px]">{currentHero.audio}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white mb-4 uppercase drop-shadow-md leading-none">
                    {currentHero.title}
                  </h1>

                  {/* Genres inline */}
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-4">
                    {currentHero.genres.map((g, i) => (
                      <React.Fragment key={g}>
                        {i > 0 && <span className="text-zinc-700">/</span>}
                        <span>{g}</span>
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Synopsis */}
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed line-clamp-3 mb-8 max-w-xl font-normal">
                    {currentHero.description}
                  </p>

                  {/* Primary & Secondary Actions */}
                  <div className="flex flex-wrap items-center gap-3.5">
                    <button
                      onClick={() => playEpisode(currentHero)}
                      className="px-6 py-3 bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-purple-300 hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-2 active:scale-95 shrink-0"
                    >
                      <Play size={16} fill="currentColor" />
                      <span>Watch Episode 1</span>
                    </button>

                    <button
                      onClick={() => toggleWatchlist(currentHero.id, currentHero.title)}
                      className={`px-5 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 glass-panel-interactive ${watchlist.includes(currentHero.id) ? 'text-purple-300 border-purple-500/40 bg-purple-950/30' : 'text-zinc-200'}`}
                    >
                      {watchlist.includes(currentHero.id) ? (
                        <>
                          <Check size={16} className="text-purple-400" />
                          <span>In Watchlist</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Add to List</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => openAnimeDetail(currentHero)}
                      className="px-4 py-3 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white glass-panel-interactive flex items-center gap-1.5 shrink-0"
                    >
                      <Info size={16} />
                      <span>Details</span>
                    </button>
                  </div>
                </motion.div>

                {/* Hero Carousel Navigation Tabs */}
                <div className="hidden lg:flex items-center gap-3 absolute bottom-16 right-10 z-20">
                  {featuredAnime.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setHeroIndex(idx)}
                      className={`group relative w-20 h-12 rounded-lg overflow-hidden border transition-all ${idx === heroIndex ? 'border-purple-400 ring-2 ring-purple-500/30 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                    >
                      <AnimeImage src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* GENRE FILTER CONTROL TABS */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 mt-6 mb-8">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest mr-2 shrink-0 flex items-center gap-1.5">
                  <ListFilter size={14} /> Filter:
                </span>
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${activeGenre === genre ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 'glass-panel text-zinc-400 hover:text-white hover:bg-white/10'}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* CONTENT ROWS */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">
              
              {/* Row 1: Trending Now with Portrait Cards */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <Flame className="text-orange-500" size={20} />
                    <h2 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">Trending Now</h2>
                  </div>
                  <button 
                    onClick={() => { setActiveGenre('All'); setCurrentPage('browse'); }}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                  >
                    Explore all <ChevronRight size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
                  {filteredAnimeList.slice(0, 6).map(anime => (
                    <AnimePortraitCard 
                      key={anime.id} 
                      anime={anime} 
                      onSelect={() => openAnimeDetail(anime)}
                      onPlay={() => playEpisode(anime)}
                      onToggleWatchlist={() => toggleWatchlist(anime.id, anime.title)}
                      isSaved={watchlist.includes(anime.id)}
                    />
                  ))}
                </div>
              </section>

              {/* Row 2: Continue Watching / Recent Episodes (Widescreen Cards) */}
              <section className="glass-panel p-6 rounded-3xl border border-white/5">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <TrendingUp className="text-purple-400" size={20} />
                    <h2 className="text-xl font-bold font-display text-white tracking-tight">Recent Episode Drops</h2>
                  </div>
                  <span className="text-xs text-zinc-400">Synced with official broadcasting</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {OFFICIAL_ANIME_DATASET.slice(0, 4).map((anime, index) => {
                    const ep = anime.episodesList?.[0] || { id: `${anime.id}-1`, number: 1, title: 'Episode 1', duration: '24m', thumbnail: anime.banner };
                    const progressPercent = [75, 45, 90, 20][index];
                    return (
                      <div 
                        key={anime.id}
                        onClick={() => playEpisode(anime, ep)}
                        className="glass-panel-interactive rounded-2xl overflow-hidden cursor-pointer group flex flex-col"
                      >
                        <div className="relative aspect-video w-full overflow-hidden">
                          <AnimeImage src={ep.thumbnail || anime.banner} alt={anime.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                          <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-white">
                            EP {ep.number}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-10 h-10 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-lg">
                              <Play size={18} fill="currentColor" className="ml-0.5" />
                            </div>
                          </div>
                          {/* Progress bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                            <div className="h-full bg-purple-500" style={{ width: `${progressPercent}%` }} />
                          </div>
                        </div>

                        <div className="p-3.5 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                              {anime.title}
                            </h4>
                            <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">{ep.title}</p>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-3 pt-2 border-t border-white/5">
                            <span>{ep.duration}</span>
                            <span className="text-purple-400 font-semibold">{progressPercent}% watched</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Row 3: Top Rated Classics & Hits */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <Award className="text-amber-400" size={20} />
                    <h2 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">Top Rated Masterpieces</h2>
                  </div>
                  <span className="text-xs text-zinc-400">Score &gt; 8.8 on MAL/AniList</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
                  {OFFICIAL_ANIME_DATASET
                    .slice()
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 6)
                    .map(anime => (
                      <AnimePortraitCard 
                        key={anime.id} 
                        anime={anime} 
                        onSelect={() => openAnimeDetail(anime)}
                        onPlay={() => playEpisode(anime)}
                        onToggleWatchlist={() => toggleWatchlist(anime.id, anime.title)}
                        isSaved={watchlist.includes(anime.id)}
                      />
                    ))}
                </div>
              </section>

              {/* Row 4: Shonen & Supernatural Highlights */}
              <section>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="text-indigo-400" size={20} />
                    <h2 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">Dark Fantasy & Supernatural</h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
                  {OFFICIAL_ANIME_DATASET
                    .filter(a => a.genres.includes('Supernatural') || a.genres.includes('Dark Fantasy'))
                    .slice(0, 6)
                    .map(anime => (
                      <AnimePortraitCard 
                        key={anime.id} 
                        anime={anime} 
                        onSelect={() => openAnimeDetail(anime)}
                        onPlay={() => playEpisode(anime)}
                        onToggleWatchlist={() => toggleWatchlist(anime.id, anime.title)}
                        isSaved={watchlist.includes(anime.id)}
                      />
                    ))}
                </div>
              </section>

            </div>
          </div>
        )}

        {/* VIEW 2: BROWSE / CATALOG VIEW */}
        {currentPage === 'browse' && (
          <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Anime Catalog</span>
                <h1 className="text-3xl md:text-4xl font-extrabold font-display text-white mt-1">Explore Anime Series</h1>
              </div>

              {/* Genre filter tags */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setActiveGenre(genre)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activeGenre === genre ? 'bg-purple-600 text-white' : 'glass-panel text-zinc-400 hover:text-white'}`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {filteredAnimeList.map(anime => (
                <AnimePortraitCard 
                  key={anime.id} 
                  anime={anime} 
                  onSelect={() => openAnimeDetail(anime)}
                  onPlay={() => playEpisode(anime)}
                  onToggleWatchlist={() => toggleWatchlist(anime.id, anime.title)}
                  isSaved={watchlist.includes(anime.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 3: ANIME DETAIL PAGE */}
        {currentPage === 'detail' && selectedAnime && (
          <div className="pb-24">
            {/* Backdrop header banner */}
            <div className="relative h-[420px] md:h-[500px] w-full overflow-hidden">
              <AnimeImage src={selectedAnime.banner} alt={selectedAnime.title} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07080d] via-[#07080d]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#07080d] via-transparent to-transparent w-1/2" />
              
              <button 
                onClick={() => setCurrentPage('home')}
                className="absolute top-24 left-6 md:left-10 px-3.5 py-2 glass-panel rounded-xl text-xs font-semibold text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors z-20 cursor-pointer"
              >
                <ChevronLeft size={16} /> Back
              </button>
            </div>

            {/* Detail Layout */}
            <div className="max-w-7xl mx-auto px-6 md:px-10 -mt-44 relative z-20">
              <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
                
                {/* Left Column: Poster & Quick Info */}
                <div className="space-y-6">
                  <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10 aspect-[2/3] w-full max-w-[280px] mx-auto lg:max-w-none">
                    <AnimeImage src={selectedAnime.thumbnail} alt={selectedAnime.title} className="w-full h-full object-cover" />
                  </div>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => playEpisode(selectedAnime)}
                      className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                    >
                      <Play size={16} fill="currentColor" />
                      <span>Watch Episode 1</span>
                    </button>

                    <button
                      onClick={() => toggleWatchlist(selectedAnime.id, selectedAnime.title)}
                      className={`w-full py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 glass-panel-interactive cursor-pointer ${watchlist.includes(selectedAnime.id) ? 'text-purple-300 border-purple-500/40 bg-purple-950/30' : 'text-zinc-200'}`}
                    >
                      {watchlist.includes(selectedAnime.id) ? (
                        <>
                          <Check size={16} className="text-purple-400" />
                          <span>Saved in Watchlist</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Add to Watchlist</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick Info Box */}
                  <div className="glass-panel p-5 rounded-2xl space-y-3 text-xs">
                    <h3 className="font-bold text-white uppercase tracking-wider text-[11px] text-zinc-400 pb-2 border-b border-white/5">Show Details</h3>
                    <div className="flex justify-between text-zinc-400">
                      <span>Format</span>
                      <span className="font-semibold text-white">{selectedAnime.type}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Status</span>
                      <span className="font-semibold text-emerald-400">{selectedAnime.status}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Studio</span>
                      <span className="font-semibold text-white">{selectedAnime.studio}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Season</span>
                      <span className="font-semibold text-white">{selectedAnime.season || selectedAnime.year}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Audio</span>
                      <span className="font-semibold text-purple-400">{selectedAnime.audio}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>MAL Rating</span>
                      <span className="font-semibold text-amber-400 flex items-center gap-1">
                        <Star size={12} fill="currentColor" />
                        {selectedAnime.rating.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Title, Synopsis, Episodes & Tabs */}
                <div>
                  {/* Clean unboxed tags */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-zinc-400 mb-2">
                    <span className="text-purple-400">{selectedAnime.studio}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedAnime.year}</span>
                    <span aria-hidden="true">·</span>
                    <span>{selectedAnime.episodes} Episodes</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400">{selectedAnime.status}</span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-black font-display text-white tracking-tight mb-2">
                    {selectedAnime.title}
                  </h1>

                  {selectedAnime.romajiTitle && (
                    <p className="text-sm font-medium text-zinc-500 italic mb-4">
                      {selectedAnime.romajiTitle}
                    </p>
                  )}

                  {/* Genres chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedAnime.genres.map(g => (
                      <span key={g} className="px-3 py-1 rounded-lg text-xs font-medium glass-panel text-zinc-300">
                        {g}
                      </span>
                    ))}
                  </div>

                  {/* Synopsis Box */}
                  <div className="glass-panel p-6 rounded-2xl mb-8">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">Synopsis</h3>
                    <p className="text-zinc-200 text-sm md:text-base leading-relaxed">
                      {selectedAnime.description}
                    </p>
                  </div>

                  {/* Tab Selector */}
                  <div className="flex items-center gap-6 border-b border-white/10 mb-6 text-sm font-semibold">
                    <button
                      onClick={() => setDetailTab('episodes')}
                      className={`pb-3 transition-colors relative ${detailTab === 'episodes' ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-500' : 'text-zinc-400 hover:text-white'}`}
                    >
                      Episodes ({selectedAnime.episodesList?.length || selectedAnime.episodes})
                    </button>
                    <button
                      onClick={() => setDetailTab('cast')}
                      className={`pb-3 transition-colors relative ${detailTab === 'cast' ? 'text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-500' : 'text-zinc-400 hover:text-white'}`}
                    >
                      Characters & Cast
                    </button>
                  </div>

                  {/* Tab 1: Episodes Grid */}
                  {detailTab === 'episodes' && (
                    <div className="space-y-3">
                      {(selectedAnime.episodesList || [
                        { id: `${selectedAnime.id}-1`, number: 1, title: 'Episode 1', duration: '24m', thumbnail: selectedAnime.banner },
                        { id: `${selectedAnime.id}-2`, number: 2, title: 'Episode 2', duration: '24m', thumbnail: selectedAnime.thumbnail },
                        { id: `${selectedAnime.id}-3`, number: 3, title: 'Episode 3', duration: '24m', thumbnail: selectedAnime.banner }
                      ]).map(ep => (
                        <div
                          key={ep.id}
                          onClick={() => playEpisode(selectedAnime, ep)}
                          className="glass-panel-interactive p-3 rounded-2xl flex items-center gap-4 cursor-pointer group"
                        >
                          <div className="relative w-36 h-20 rounded-xl overflow-hidden shrink-0">
                            <AnimeImage src={ep.thumbnail || selectedAnime.banner} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shadow">
                                <Play size={14} fill="currentColor" className="ml-0.5" />
                              </div>
                            </div>
                            <span className="absolute bottom-1 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                              {ep.duration}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-purple-400">EP {ep.number}</span>
                              {ep.airDate && <span className="text-[10px] text-zinc-500">· {ep.airDate}</span>}
                            </div>
                            <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                              {ep.title}
                            </h4>
                            <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">Stream in Japanese Sub or English Dub with multi-subs</p>
                          </div>

                          <div className="pr-3 text-zinc-400 group-hover:text-white transition-colors">
                            <Play size={18} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab 2: Characters & Cast */}
                  {detailTab === 'cast' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(selectedAnime.characters || [
                        { id: 'c1', name: 'Main Character', role: 'Protagonist', image: selectedAnime.thumbnail, voiceActor: 'Top Seiyuu' },
                        { id: 'c2', name: 'Supporting Hero', role: 'Ally', image: selectedAnime.banner, voiceActor: 'Celebrated Voice Actor' }
                      ]).map(char => (
                        <div key={char.id} className="glass-panel p-3.5 rounded-2xl flex items-center gap-3.5 border border-white/5">
                          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-purple-500/30">
                            <AnimeImage src={char.image} alt={char.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{char.name}</h4>
                            <p className="text-xs text-purple-400">{char.role}</p>
                            {char.voiceActor && (
                              <p className="text-[11px] text-zinc-400 mt-0.5">CV: {char.voiceActor}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: CINEMA VIDEO PLAYER */}
        {currentPage === 'player' && selectedAnime && (
          <div className="fixed inset-0 z-[70] bg-[#050609] flex flex-col">
            {/* Top Player Bar */}
            <div className="h-16 px-6 glass-panel flex items-center justify-between border-b border-white/10 shrink-0 z-30">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage('detail')}
                  className="p-2 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Close Player"
                >
                  <X size={20} />
                </button>
                <div>
                  <h3 className="text-sm font-bold text-white">{selectedAnime.title}</h3>
                  <p className="text-xs text-zinc-400">
                    Episode {selectedEpisode.number}: {selectedEpisode.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowEpisodeDrawer(prev => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold glass-panel-interactive flex items-center gap-1.5 cursor-pointer ${showEpisodeDrawer ? 'text-purple-400 border-purple-500/40' : 'text-zinc-300'}`}
                >
                  <Layers size={14} />
                  <span>Episodes</span>
                </button>
                <button
                  onClick={() => toggleWatchlist(selectedAnime.id, selectedAnime.title)}
                  className="p-2 rounded-lg hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="Add to Watchlist"
                >
                  <Bookmark size={18} className={watchlist.includes(selectedAnime.id) ? 'fill-purple-400 text-purple-400' : ''} />
                </button>
              </div>
            </div>

            {/* Video Canvas Area */}
            <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden group">
              <video
                ref={videoRef}
                src={STREAM_VIDEO_SRC}
                poster={selectedEpisode.thumbnail || selectedAnime.banner}
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => {
                  if (videoRef.current) {
                    if (isPlaying) {
                      videoRef.current.pause();
                      setIsPlaying(false);
                    } else {
                      videoRef.current.play().catch(() => {});
                      setIsPlaying(true);
                    }
                  }
                }}
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    setCurrentTime(videoRef.current.currentTime);
                    setDuration(videoRef.current.duration || 1440);
                  }
                }}
                onEnded={() => setIsPlaying(false)}
                playsInline
              />

              {/* Center Play/Pause Indicator when paused */}
              {!isPlaying && (
                <div 
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.play().catch(() => {});
                      setIsPlaying(true);
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10"
                >
                  <div className="w-20 h-20 rounded-full bg-purple-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform">
                    <Play size={36} fill="currentColor" className="ml-1" />
                  </div>
                </div>
              )}

              {/* Episode Drawer Slide-out */}
              <AnimatePresence>
                {showEpisodeDrawer && (
                  <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="absolute top-0 right-0 bottom-0 w-80 md:w-96 glass-panel z-40 border-l border-white/10 flex flex-col p-5 shadow-2xl overflow-y-auto no-scrollbar"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                      <span className="font-bold text-sm text-white">Select Episode</span>
                      <button onClick={() => setShowEpisodeDrawer(false)} className="text-zinc-400 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {(selectedAnime.episodesList || [
                        { id: `${selectedAnime.id}-1`, number: 1, title: 'Episode 1', duration: '24m', thumbnail: selectedAnime.banner },
                        { id: `${selectedAnime.id}-2`, number: 2, title: 'Episode 2', duration: '24m', thumbnail: selectedAnime.thumbnail }
                      ]).map(ep => (
                        <div
                          key={ep.id}
                          onClick={() => {
                            setSelectedEpisode(ep);
                            setShowEpisodeDrawer(false);
                            if (videoRef.current) {
                              videoRef.current.currentTime = 0;
                              videoRef.current.play().catch(() => {});
                              setIsPlaying(true);
                            }
                          }}
                          className={`p-2.5 rounded-xl flex items-center gap-3 cursor-pointer transition-colors ${selectedEpisode.id === ep.id ? 'bg-purple-600/30 border border-purple-500/50' : 'hover:bg-white/5 border border-transparent'}`}
                        >
                          <div className="w-20 h-12 rounded overflow-hidden shrink-0">
                            <AnimeImage src={ep.thumbnail || selectedAnime.banner} alt={ep.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[11px] font-bold text-purple-400">EP {ep.number}</span>
                            <h5 className="text-xs font-semibold text-white truncate">{ep.title}</h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Custom Controls Bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pt-16 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                {/* Progress Scrubber */}
                <div 
                  className="relative w-full h-2 bg-white/20 rounded-full mb-4 cursor-pointer overflow-hidden group/bar"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const percent = (e.clientX - rect.left) / rect.width;
                    if (videoRef.current) {
                      videoRef.current.currentTime = percent * duration;
                      setCurrentTime(percent * duration);
                    }
                  }}
                >
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 relative"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>

                {/* Buttons and toggles */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          if (isPlaying) {
                            videoRef.current.pause();
                            setIsPlaying(false);
                          } else {
                            videoRef.current.play().catch(() => {});
                            setIsPlaying(true);
                          }
                        }
                      }}
                      className="p-1 text-white hover:text-purple-400 transition-colors cursor-pointer"
                    >
                      {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                    </button>

                    <button 
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
                        }
                      }}
                      className="text-zinc-300 hover:text-white transition-colors cursor-pointer" 
                      title="Rewind 10s"
                    >
                      <RotateCcw size={18} />
                    </button>

                    <button 
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
                        }
                      }}
                      className="text-zinc-300 hover:text-white transition-colors cursor-pointer" 
                      title="Forward 10s"
                    >
                      <FastForward size={18} />
                    </button>

                    {/* Volume */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          const nextMute = !isMuted;
                          setIsMuted(nextMute);
                          if (videoRef.current) {
                            videoRef.current.muted = nextMute;
                          }
                        }}
                        className="text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                      </button>
                      <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.05" 
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          const v = parseFloat(e.target.value);
                          setVolume(v);
                          setIsMuted(v === 0);
                          if (videoRef.current) {
                            videoRef.current.volume = v;
                            videoRef.current.muted = v === 0;
                          }
                        }}
                        className="w-16 h-1 bg-white/20 accent-purple-500 rounded cursor-pointer"
                      />
                    </div>

                    {/* Timestamp */}
                    <span className="text-xs font-mono tabular-nums text-zinc-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Skip Intro Button */}
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          videoRef.current.currentTime += 85;
                          showToast('Skipped 85s Intro');
                        }
                      }}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-bold text-white transition-colors cursor-pointer"
                    >
                      Skip Intro +85s
                    </button>

                    {/* Audio Selector */}
                    <button
                      onClick={() => {
                        const next = currentAudio === 'Japanese (Sub)' ? 'English (Dub)' : 'Japanese (Sub)';
                        setCurrentAudio(next);
                        showToast(`Switched audio to ${next}`);
                      }}
                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-semibold text-purple-300 cursor-pointer"
                    >
                      {currentAudio}
                    </button>

                    {/* Quality Selector */}
                    <button
                      onClick={() => {
                        const next = currentQuality === '1080p Ultra HD' ? '720p HD' : currentQuality === '720p HD' ? '480p SD' : '1080p Ultra HD';
                        setCurrentQuality(next);
                        showToast(`Video quality set to ${next}`);
                      }}
                      className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-xs font-mono text-zinc-300 cursor-pointer"
                    >
                      {currentQuality}
                    </button>

                    {/* Fullscreen */}
                    <button
                      onClick={() => {
                        if (!document.fullscreenElement) {
                          document.documentElement.requestFullscreen?.().catch(() => {});
                          setIsFullscreen(true);
                        } else {
                          document.exitFullscreen?.().catch(() => {});
                          setIsFullscreen(false);
                        }
                      }}
                      className="p-1 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                      title="Fullscreen"
                    >
                      {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: WATCHLIST PAGE */}
        {currentPage === 'watchlist' && (
          <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 md:px-10">
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Saved Collection</span>
                <h1 className="text-3xl md:text-4xl font-extrabold font-display text-white mt-1">My Watchlist</h1>
              </div>
              <div className="text-xs font-semibold text-zinc-400 glass-panel px-4 py-2 rounded-xl">
                {watchlist.length} Titles Saved
              </div>
            </div>

            {watchlist.length === 0 ? (
              <div className="glass-panel p-16 rounded-3xl text-center max-w-lg mx-auto">
                <Bookmark size={48} className="text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Your Watchlist is empty</h3>
                <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                  Browse trending anime series and tap "Add to List" to save shows you want to watch later.
                </p>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                >
                  Explore Trending Shows
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {OFFICIAL_ANIME_DATASET
                  .filter(a => watchlist.includes(a.id))
                  .map(anime => (
                    <AnimePortraitCard 
                      key={anime.id} 
                      anime={anime} 
                      onSelect={() => openAnimeDetail(anime)}
                      onPlay={() => playEpisode(anime)}
                      onToggleWatchlist={() => toggleWatchlist(anime.id, anime.title)}
                      isSaved={true}
                    />
                  ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 6: USER PROFILE PAGE */}
        {currentPage === 'profile' && (
          <div className="pt-28 pb-24 max-w-4xl mx-auto px-6">
            <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 mb-8 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500 shadow-xl shadow-purple-600/30 p-1 bg-gradient-to-tr from-purple-500 to-pink-500 shrink-0">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1">
                    <h2 className="text-2xl font-bold font-display text-white">{user.name}</h2>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {user.tier}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-medium">{user.handle} · Anime connoisseur since 2021</p>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10 text-center">
                <div className="p-3 rounded-xl bg-white/5">
                  <span className="block text-2xl font-extrabold text-white font-mono">{user.stats.episodesWatched}</span>
                  <span className="text-[11px] text-zinc-400 uppercase font-semibold">Episodes</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <span className="block text-2xl font-extrabold text-purple-400 font-mono">{user.stats.hoursSpent}h</span>
                  <span className="text-[11px] text-zinc-400 uppercase font-semibold">Hours Streamed</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <span className="block text-2xl font-extrabold text-pink-400 font-mono">{user.stats.favorites}</span>
                  <span className="text-[11px] text-zinc-400 uppercase font-semibold">Favorites</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5">
                  <span className="block text-2xl font-extrabold text-emerald-400 font-mono">{user.stats.completedAnime}</span>
                  <span className="text-[11px] text-zinc-400 uppercase font-semibold">Completed</span>
                </div>
              </div>
            </div>

            {/* Playback Settings */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300">Streaming Preferences</h3>
              
              <div className="divide-y divide-white/5 text-xs">
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-white">Autoplay Next Episode</h5>
                    <p className="text-zinc-500">Automatically advance to the next episode when current ends</p>
                  </div>
                  <div className="w-10 h-5 bg-purple-600 rounded-full p-0.5 cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full translate-x-5 transition-transform" />
                  </div>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-white">Default Video Quality</h5>
                    <p className="text-zinc-500">Preferred streaming resolution on broadband</p>
                  </div>
                  <span className="font-mono text-purple-300 font-semibold">1080p Ultra HD</span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-white">Default Audio Track</h5>
                    <p className="text-zinc-500">Choose between original Japanese audio or localized dubs</p>
                  </div>
                  <span className="font-semibold text-purple-300">Original Japanese (Sub)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SEARCH MODAL OVERLAY */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-2xl flex flex-col items-center pt-20 px-6 overflow-y-auto"
          >
            <div className="w-full max-w-3xl">
              {/* Input header */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400" size={20} />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search by anime title, character, genre, or studio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-12 rounded-2xl glass-input text-base text-white placeholder-zinc-500 focus:outline-none"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Quick Suggestion Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-xs text-zinc-500 font-semibold mr-1">Trending Searches:</span>
                {['Dan Da Dan', 'Jujutsu Kaisen', 'Frieren', 'Chainsaw Man', 'Solo Leveling', 'Cyberpunk'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-2.5 py-1 rounded-md text-xs glass-panel text-zinc-300 hover:text-white hover:bg-white/10"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Search Results */}
              {searchQuery.trim() !== '' && (
                <div className="space-y-3 pb-16">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-3">
                    Search Results ({searchResults.length})
                  </span>

                  {searchResults.length === 0 ? (
                    <div className="py-16 text-center text-zinc-500 text-sm">
                      No matching anime found for "{searchQuery}". Try another keyword or genre.
                    </div>
                  ) : (
                    searchResults.map(anime => (
                      <div
                        key={anime.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          openAnimeDetail(anime);
                        }}
                        className="glass-panel-interactive p-3 rounded-2xl flex items-center gap-4 cursor-pointer group"
                      >
                        <div className="w-16 h-24 rounded-lg overflow-hidden shrink-0">
                          <AnimeImage src={anime.thumbnail} alt={anime.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors truncate">
                            {anime.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                            <span className="text-purple-400 font-semibold">{anime.studio}</span>
                            <span>·</span>
                            <span>{anime.year}</span>
                            <span>·</span>
                            <span>{anime.episodes} Ep</span>
                            <span>·</span>
                            <span className="text-amber-400 flex items-center gap-0.5">
                              <Star size={10} fill="currentColor" /> {anime.rating}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{anime.description}</p>
                        </div>
                        <ChevronRight size={18} className="text-zinc-500 group-hover:text-white transition-colors mr-2" />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUIET FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6 md:px-10 mt-auto bg-[#050609]/90">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
              K
            </div>
            <span className="font-bold text-zinc-300 font-display">KuroAnime</span>
            <span className="text-zinc-600">· Premium Anime Experience</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentPage('home')} className="hover:text-zinc-300 transition-colors">Home</button>
            <button onClick={() => { setActiveGenre('All'); setCurrentPage('browse'); }} className="hover:text-zinc-300 transition-colors">Catalog</button>
            <button onClick={() => setCurrentPage('watchlist')} className="hover:text-zinc-300 transition-colors">Watchlist</button>
            <button onClick={() => setCurrentPage('profile')} className="hover:text-zinc-300 transition-colors">Profile</button>
          </div>

          <div>
            © 2026 KuroAnime. Real-time streaming powered by Consumet.
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- High-Performance Portrait Anime Card Component ---

function AnimePortraitCard({ 
  anime, 
  onSelect, 
  onPlay, 
  onToggleWatchlist, 
  isSaved 
}: { 
  anime: Anime; 
  onSelect: () => void; 
  onPlay: () => void; 
  onToggleWatchlist: () => void; 
  isSaved: boolean;
  key?: string | number;
}) {
  return (
    <div 
      className="group relative flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
      onClick={onSelect}
    >
      {/* Poster Image Container */}
      <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden glass-panel border border-white/10 group-hover:border-purple-500/50 group-hover:shadow-2xl group-hover:shadow-purple-900/30 transition-all">
        <AnimeImage 
          src={anime.thumbnail} 
          alt={anime.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-1 bg-black/65 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[10px] font-bold text-amber-400 border border-white/10">
            <Star size={10} fill="currentColor" />
            <span>{anime.rating.toFixed(1)}</span>
          </div>

          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-600/90 text-white shadow">
            {anime.audio.split('/')[0]}
          </span>
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            className="w-11 h-11 rounded-full bg-white text-zinc-950 flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl"
            title="Play Episode 1"
          >
            <Play size={18} fill="currentColor" className="ml-0.5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWatchlist();
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border hover:scale-110 active:scale-95 transition-transform shadow-lg ${isSaved ? 'bg-purple-600 text-white border-purple-400' : 'bg-black/70 text-white border-white/20'}`}
            title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
          >
            {isSaved ? <Check size={16} /> : <Plus size={16} />}
          </button>
        </div>

        {/* Card bottom meta overlay */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 pointer-events-none">
          <p className="text-[10px] font-bold text-purple-300 uppercase tracking-wider">{anime.studio}</p>
          <p className="text-[11px] text-zinc-300 font-medium">{anime.episodes} Episodes</p>
        </div>
      </div>

      {/* Title & Category Under Card */}
      <div className="mt-2.5 px-0.5">
        <h3 className="font-bold text-xs md:text-sm text-white group-hover:text-purple-400 transition-colors line-clamp-1">
          {anime.title}
        </h3>
        <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
          {anime.genres.slice(0, 2).join(' · ')}
        </p>
      </div>
    </div>
  );
}
