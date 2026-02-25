import { EventType } from '../constants/theme';

export interface EventItem {
  id: string;
  title: string;
  type: EventType;
  image: string;
  organizer: string;
  orgAvatar: string;
  orgVerified: boolean;
  date: string;
  time: string;
  location: string;
  city: string;
  capacity: number;
  registered: number;
  countdown: string;
  isLive: boolean;
  signals: { type: 'social' | 'geo' | 'interest'; text: string; color: string }[];
  description: string;
  xpReward: number;
  badgeReward?: string;
  // Sport-specific
  teamA?: string;
  teamB?: string;
  scoreA?: number;
  scoreB?: number;
  round?: string;
  // Science-specific
  callForPapers?: boolean;
  cfpDeadline?: string;
  cfpStatus?: string;
  speakers?: { name: string; title: string; avatar: string }[];
  doiLinks?: string[];
  // Charity-specific
  fundraisingGoal?: number;
  fundraisingCurrent?: number;
  volunteerShifts?: { role: string; time: string; slotsTotal: number; slotsFilled: number; skills: string[] }[];
  // Cultural-specific
  performers?: { name: string; stage: string; time: string; avatar: string }[];
  ticketTiers?: { name: string; price: number; perks: string[]; shape: string }[];
}

export interface StoryItem {
  id: string;
  name: string;
  avatar: string;
  isLive: boolean;
  isVerified: boolean;
  isSponsor: boolean;
  isAdd?: boolean;
}

export interface BadgeItem {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
  icon: string;
  color: string;
  earnedAt?: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  time: string;
  color: string;
  icon: string;
}

export interface OrgItem {
  id: string;
  name: string;
  logo: string;
  type: string;
  verified: boolean;
  events: number;
  followers: number;
}

export interface SkillItem {
  name: string;
  level: number;
  verified: boolean;
  events: number;
  category: 'tech' | 'leadership' | 'creative' | 'social';
}

export const stories: StoryItem[] = [
  { id: '0', name: 'ADD STORY', avatar: '', isLive: false, isVerified: false, isSponsor: false, isAdd: true },
  { id: '1', name: 'LIVE_P102', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', isLive: true, isVerified: false, isSponsor: false },
  { id: '2', name: 'ELITE_01', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&crop=face', isLive: false, isVerified: true, isSponsor: false },
  { id: '3', name: 'SUPREME_X', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face', isLive: false, isVerified: false, isSponsor: true },
  { id: '4', name: 'PLAYER_77', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', isLive: false, isVerified: true, isSponsor: false },
  { id: '5', name: 'VORTEX_DZ', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', isLive: true, isVerified: false, isSponsor: false },
  { id: '6', name: 'NEXUS_AI', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', isLive: false, isVerified: true, isSponsor: false },
];

export const events: EventItem[] = [
  {
    id: '1',
    title: 'NEON CIRCUIT: THE FINAL ELIMINATION',
    type: 'sport',
    image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=450&fit=crop',
    organizer: 'ORG_PRIME',
    orgAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'JAN 15, 2026',
    time: '18:00',
    location: 'Olympic Stadium Complex',
    city: 'Algiers',
    capacity: 500,
    registered: 284,
    countdown: '2D 14H',
    isLive: false,
    signals: [
      { type: 'social', text: 'Ali, Sarah +12 are going', color: '#FF2D78' },
      { type: 'geo', text: '2.3km from USTHB', color: '#00E5CC' },
      { type: 'interest', text: 'Because you like Sports', color: '#FFD700' },
    ],
    description: 'The ultimate inter-university showdown is here. 16 teams. 1 mission. Survival of the fittest on the pitch. Join the crowd or enter the arena as a player. Earn glory, respect, and mission XP.',
    xpReward: 100,
    badgeReward: 'Arena Champion',
    teamA: 'VALIANT FC',
    teamB: 'TITAN UTD',
    scoreA: 3,
    scoreB: 1,
    round: 'ROUND 04 / FINAL',
  },
  {
    id: '2',
    title: 'INTER-UNI AI SUMMIT',
    type: 'science',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop',
    organizer: 'EVENTFY COUNCIL',
    orgAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'FEB 03, 2026',
    time: '09:00',
    location: 'Campus Alpha',
    city: 'Bejaia',
    capacity: 300,
    registered: 187,
    countdown: '5D 12H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Matches: Python, ML skills', color: '#FFD700' },
      { type: 'social', text: '8 from your university', color: '#FF2D78' },
      { type: 'geo', text: 'Your campus', color: '#00E5CC' },
    ],
    description: 'AI Research & Ethics Protocol. Join the leading minds in artificial intelligence for a day of presentations, workshops, and networking.',
    xpReward: 150,
    badgeReward: 'Research Pioneer',
    callForPapers: true,
    cfpDeadline: '5D 12H 00M',
    cfpStatus: 'OPEN',
    speakers: [
      { name: 'DR. ARIS T.', title: 'NEURAL ARCHITECT', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
      { name: 'PROF. V. KOSMOS', title: 'ETHICS CHAIR', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face' },
    ],
    doiLinks: ['10.1016/j.artint.2023.103984'],
  },
  {
    id: '3',
    title: 'RAMADAN FOOD DRIVE',
    type: 'charity',
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=450&fit=crop',
    organizer: 'GREEN EARTH NGO',
    orgAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'MAR 01, 2026',
    time: '08:00',
    location: 'Grande Poste',
    city: 'Algiers',
    capacity: 200,
    registered: 142,
    countdown: '12D 08H',
    isLive: false,
    signals: [
      { type: 'social', text: 'Omar +5 volunteering', color: '#FF2D78' },
      { type: 'geo', text: '4.1km away', color: '#00E5CC' },
      { type: 'interest', text: 'Community service match', color: '#FFD700' },
    ],
    description: 'Join our annual Ramadan food distribution campaign. Help prepare and distribute meals to families in need across Algiers.',
    xpReward: 200,
    badgeReward: 'Community Hero',
    fundraisingGoal: 2000000,
    fundraisingCurrent: 847000,
    volunteerShifts: [
      { role: 'Logistics & Sorting', time: '08:00 AM - 12:00 PM', slotsTotal: 5, slotsFilled: 3, skills: ['Heavy Lifting', 'Teamwork'] },
      { role: 'Media Coverage', time: '10:00 AM - 02:00 PM', slotsTotal: 3, slotsFilled: 3, skills: ['Photography', 'Editing'] },
      { role: 'Registration Desk', time: '02:00 PM - 06:00 PM', slotsTotal: 4, slotsFilled: 1, skills: ['Data Entry', 'Multilingual'] },
    ],
  },
  {
    id: '4',
    title: 'ALGIERS MUSIC FESTIVAL',
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=450&fit=crop',
    organizer: 'CULTURE_HQ',
    orgAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'NOV 24, 2026',
    time: '19:00',
    location: 'Algiers Arena',
    city: 'Algiers',
    capacity: 2000,
    registered: 1247,
    countdown: '4D 02H',
    isLive: false,
    signals: [
      { type: 'social', text: 'Sarah, Leila +34 going', color: '#FF2D78' },
      { type: 'geo', text: '5.8km from you', color: '#00E5CC' },
      { type: 'interest', text: 'Culture enthusiast match', color: '#FFD700' },
    ],
    description: 'The biggest music festival in Algeria. Three stages, twelve performers, one unforgettable night under the stars.',
    xpReward: 200,
    badgeReward: 'Culture Enthusiast',
    performers: [
      { name: 'TECHNO PHARAOH', stage: 'MAIN STAGE · HEADLINER', time: '22:00', avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&h=100&fit=crop&crop=face' },
      { name: 'SAHARA ECHOES', stage: 'CULTURAL TENT · LIVE BAND', time: '20:30', avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=face' },
      { name: 'PULSE GENERATOR', stage: 'THE UNDERGROUND · DJ SET', time: '19:00', avatar: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=100&h=100&fit=crop&crop=face' },
    ],
    ticketTiers: [
      { name: 'STANDARD', price: 2000, perks: ['Entry to Main Festival Grounds', 'Standard Food/Drink Access'], shape: '□' },
      { name: 'VIP PASS', price: 5000, perks: ['Front Row Stage Access', 'VIP Lounge & Bar', 'Dedicated Restrooms'], shape: '△' },
      { name: 'VVIP ULTIMATE', price: 12000, perks: ['Backstage Access (Meet & Greet)', 'Private Table with Bottle Service', 'Priority Mission Site Parking'], shape: '○' },
    ],
  },
  {
    id: '5',
    title: 'SYNTHWAVE REBELS LIVE',
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=450&fit=crop',
    organizer: 'VOX_NETWORKS',
    orgAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    orgVerified: false,
    date: 'DEC 10, 2025',
    time: '20:00',
    location: 'Underground Club',
    city: 'Oran',
    capacity: 2000,
    registered: 1200,
    countdown: '4D 02H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Vocal Boost match', color: '#FFD700' },
      { type: 'social', text: '3 connections attending', color: '#FF2D78' },
    ],
    description: 'An electronic music experience like no other. Synthwave meets Algerian rhythms in this underground sensation.',
    xpReward: 100,
    performers: [
      { name: 'SYNTHWAVE REBELS', stage: 'MAIN STAGE', time: '22:00', avatar: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop&crop=face' },
    ],
    ticketTiers: [
      { name: 'STANDARD', price: 1500, perks: ['General Admission'], shape: '□' },
      { name: 'VIP', price: 4000, perks: ['VIP Area', 'Free Drinks'], shape: '△' },
    ],
  },
  {
    id: '6',
    title: 'GLOBAL HACKATHON 2026',
    type: 'science',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=450&fit=crop',
    organizer: 'TECH_ALLIANCE',
    orgAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'APR 20, 2026',
    time: '08:00',
    location: 'Innovation Hub',
    city: 'Constantine',
    capacity: 150,
    registered: 143,
    countdown: '8D 04H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Python + React match', color: '#FFD700' },
      { type: 'social', text: '14 from your network', color: '#FF2D78' },
      { type: 'geo', text: 'Constantine region', color: '#00E5CC' },
    ],
    description: '48-hour coding marathon. Build, compete, and innovate with the best developers in Algeria.',
    xpReward: 300,
    badgeReward: 'Code Warrior',
    callForPapers: false,
    cfpStatus: 'CLOSED',
    speakers: [
      { name: 'KARIM Z.', title: 'CTO, TECHCORP', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
    ],
  },
  {
    id: '7',
    title: 'CHARITY RUN FOR EDUCATION',
    type: 'charity',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=450&fit=crop',
    organizer: 'HOPE_FOUNDATION',
    orgAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'FEB 14, 2026',
    time: '07:00',
    location: 'Waterfront Park',
    city: 'Annaba',
    capacity: 500,
    registered: 312,
    countdown: '20D 10H',
    isLive: false,
    signals: [
      { type: 'social', text: '6 friends registered', color: '#FF2D78' },
      { type: 'interest', text: 'Fitness + Charity match', color: '#FFD700' },
    ],
    description: 'Run 5K or 10K to raise funds for educational supplies in rural schools. Every step counts.',
    xpReward: 250,
    fundraisingGoal: 500000,
    fundraisingCurrent: 210000,
    volunteerShifts: [
      { role: 'Water Station', time: '06:30 AM - 10:00 AM', slotsTotal: 8, slotsFilled: 5, skills: ['Early Riser'] },
      { role: 'Photography', time: '07:00 AM - 11:00 AM', slotsTotal: 3, slotsFilled: 1, skills: ['Photography'] },
    ],
  },
  {
    id: '8',
    title: 'INTER-UNI FOOTBALL CUP',
    type: 'sport',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    organizer: 'SPORTS_LEAGUE',
    orgAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'MAR 15, 2026',
    time: '14:00',
    location: 'University Stadium',
    city: 'Bejaia',
    capacity: 800,
    registered: 456,
    countdown: '15D 06H',
    isLive: false,
    signals: [
      { type: 'social', text: 'Your team is competing', color: '#FF2D78' },
      { type: 'geo', text: '1.2km away', color: '#00E5CC' },
    ],
    description: 'The annual inter-university football championship. 8 universities, 1 trophy. Who will claim victory?',
    xpReward: 150,
    teamA: 'EAGLES FC',
    teamB: 'PHOENIX UTD',
    scoreA: 0,
    scoreB: 0,
    round: 'QUARTER-FINAL',
  },
  {
    id: '9',
    title: 'CYBERSECURITY WORKSHOP',
    type: 'science',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop',
    organizer: 'CYBER_CLUB',
    orgAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    orgVerified: false,
    date: 'JAN 28, 2026',
    time: '10:00',
    location: 'Tech Lab B',
    city: 'Algiers',
    capacity: 50,
    registered: 47,
    countdown: '1D 08H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Security skills match', color: '#FFD700' },
    ],
    description: 'Hands-on workshop covering penetration testing, vulnerability assessment, and ethical hacking fundamentals.',
    xpReward: 200,
    callForPapers: false,
    speakers: [
      { name: 'HACKER_X', title: 'SECURITY RESEARCHER', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    ],
  },
  {
    id: '10',
    title: 'BLOOD DONATION DRIVE',
    type: 'charity',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&h=450&fit=crop',
    organizer: 'RED_CRESCENT',
    orgAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'FEB 20, 2026',
    time: '09:00',
    location: 'University Medical Center',
    city: 'Tlemcen',
    capacity: 100,
    registered: 67,
    countdown: '25D 14H',
    isLive: false,
    signals: [
      { type: 'social', text: 'Ahmed +3 are donating', color: '#FF2D78' },
    ],
    description: 'Save lives. One donation can help up to three people. All blood types needed.',
    xpReward: 300,
    fundraisingGoal: 100,
    fundraisingCurrent: 67,
    volunteerShifts: [
      { role: 'Registration', time: '08:30 AM - 12:00 PM', slotsTotal: 4, slotsFilled: 2, skills: ['Communication'] },
    ],
  },
  {
    id: '11',
    title: 'STARTUP PITCH NIGHT',
    type: 'science',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=450&fit=crop',
    organizer: 'STARTUP_DZ',
    orgAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'MAR 08, 2026',
    time: '18:00',
    location: 'Co-Working Space',
    city: 'Algiers',
    capacity: 80,
    registered: 74,
    countdown: '18D 22H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Entrepreneurship match', color: '#FFD700' },
      { type: 'social', text: '5 connections going', color: '#FF2D78' },
    ],
    description: '10 startups. 5 minutes each. One winner gets seed funding. Join the audience or pitch your idea.',
    xpReward: 150,
    speakers: [
      { name: 'LINA B.', title: 'ANGEL INVESTOR', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
    ],
  },
  {
    id: '12',
    title: 'NEON BASKETBALL TOURNAMENT',
    type: 'sport',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=450&fit=crop',
    organizer: 'HOOP_NATION',
    orgAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    orgVerified: false,
    date: 'APR 05, 2026',
    time: '15:00',
    location: 'Indoor Arena',
    city: 'Setif',
    capacity: 200,
    registered: 156,
    countdown: '30D 08H',
    isLive: false,
    signals: [
      { type: 'geo', text: 'Setif region', color: '#00E5CC' },
    ],
    description: '3v3 basketball under neon lights. Music, competition, and glory await.',
    xpReward: 120,
    teamA: 'NEON WOLVES',
    teamB: 'SHADOW HAWKS',
    scoreA: 0,
    scoreB: 0,
    round: 'GROUP STAGE',
  },
  {
    id: '13',
    title: 'POETRY & SPOKEN WORD NIGHT',
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=450&fit=crop',
    organizer: 'ARTS_COLLECTIVE',
    orgAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'FEB 28, 2026',
    time: '19:30',
    location: 'Cultural Center',
    city: 'Constantine',
    capacity: 120,
    registered: 89,
    countdown: '22D 16H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Arts & Culture match', color: '#FFD700' },
    ],
    description: 'An evening celebrating the power of words. Arabic, French, and Amazigh poetry performances.',
    xpReward: 100,
    performers: [
      { name: 'MAYA SPOKEN', stage: 'MAIN HALL', time: '20:00', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
      { name: 'KARIM VERSE', stage: 'MAIN HALL', time: '20:30', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    ],
    ticketTiers: [
      { name: 'GENERAL', price: 500, perks: ['Seating'], shape: '□' },
      { name: 'FRONT ROW', price: 1500, perks: ['Front Row Seating', 'Meet & Greet'], shape: '△' },
    ],
  },
  {
    id: '14',
    title: 'ROBOTICS COMPETITION',
    type: 'science',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop',
    organizer: 'ROBO_LEAGUE',
    orgAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'MAY 10, 2026',
    time: '09:00',
    location: 'Engineering Faculty',
    city: 'Bejaia',
    capacity: 100,
    registered: 88,
    countdown: '45D 02H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Robotics + Engineering match', color: '#FFD700' },
      { type: 'geo', text: 'Your city', color: '#00E5CC' },
    ],
    description: 'Build autonomous robots, compete in challenges, and prove your engineering prowess.',
    xpReward: 250,
    callForPapers: true,
    cfpDeadline: '30D 00H 00M',
    cfpStatus: 'OPEN',
  },
  {
    id: '15',
    title: 'BEACH VOLLEYBALL CHAMPIONSHIP',
    type: 'sport',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=450&fit=crop',
    organizer: 'COASTAL_SPORTS',
    orgAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face',
    orgVerified: false,
    date: 'JUN 20, 2026',
    time: '10:00',
    location: 'Sablettes Beach',
    city: 'Algiers',
    capacity: 64,
    registered: 48,
    countdown: '60D 12H',
    isLive: false,
    signals: [
      { type: 'geo', text: 'Beachfront venue', color: '#00E5CC' },
      { type: 'social', text: '2 friends interested', color: '#FF2D78' },
    ],
    description: 'Sun, sand, and fierce competition. 2v2 beach volleyball tournament with prizes.',
    xpReward: 100,
    teamA: 'SAND STORM',
    teamB: 'WAVE RIDERS',
  },
  {
    id: '16',
    title: 'TREE PLANTING INITIATIVE',
    type: 'charity',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop',
    organizer: 'ECO_WARRIORS',
    orgAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'MAR 22, 2026',
    time: '08:00',
    location: 'National Forest',
    city: 'Blida',
    capacity: 300,
    registered: 198,
    countdown: '35D 08H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Environment match', color: '#FFD700' },
    ],
    description: 'Plant 1000 trees in one day. Bring gloves, water, and determination.',
    xpReward: 200,
    fundraisingGoal: 300000,
    fundraisingCurrent: 145000,
    volunteerShifts: [
      { role: 'Planting Team', time: '08:00 AM - 12:00 PM', slotsTotal: 50, slotsFilled: 35, skills: ['Physical Fitness'] },
      { role: 'Supply Distribution', time: '07:00 AM - 01:00 PM', slotsTotal: 10, slotsFilled: 7, skills: ['Organization'] },
    ],
  },
  {
    id: '17',
    title: 'DIGITAL ART EXHIBITION',
    type: 'cultural',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=450&fit=crop',
    organizer: 'PIXEL_ARTS',
    orgAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'APR 15, 2026',
    time: '17:00',
    location: 'Modern Art Museum',
    city: 'Oran',
    capacity: 250,
    registered: 167,
    countdown: '40D 14H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Design + Art match', color: '#FFD700' },
      { type: 'social', text: 'Leila is exhibiting', color: '#FF2D78' },
    ],
    description: 'Immersive digital art installations from 20 Algerian artists. VR experiences included.',
    xpReward: 120,
    performers: [
      { name: 'DIGITAL COLLECTIVE', stage: 'GALLERY A', time: '17:00', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' },
    ],
    ticketTiers: [
      { name: 'ENTRY', price: 800, perks: ['Gallery Access'], shape: '□' },
      { name: 'VR PASS', price: 2500, perks: ['Gallery + VR Experiences', 'Artist Meet'], shape: '△' },
    ],
  },
  {
    id: '18',
    title: 'DATA SCIENCE BOOTCAMP',
    type: 'science',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
    organizer: 'DATA_DZ',
    orgAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'MAR 28, 2026',
    time: '09:00',
    location: 'Tech Campus',
    city: 'Algiers',
    capacity: 40,
    registered: 38,
    countdown: '28D 04H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Python + Data match', color: '#FFD700' },
    ],
    description: 'Intensive 2-day bootcamp covering pandas, scikit-learn, and real-world data projects.',
    xpReward: 250,
    callForPapers: false,
    speakers: [
      { name: 'DR. SALIM K.', title: 'DATA LEAD', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    ],
  },
  {
    id: '19',
    title: 'MARATHON FOR PEACE',
    type: 'sport',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fceed?w=800&h=450&fit=crop',
    organizer: 'PEACE_RUNNERS',
    orgAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'APR 01, 2026',
    time: '06:00',
    location: 'City Center Route',
    city: 'Algiers',
    capacity: 1000,
    registered: 723,
    countdown: '32D 18H',
    isLive: false,
    signals: [
      { type: 'social', text: '15 from your network', color: '#FF2D78' },
      { type: 'geo', text: 'Central Algiers', color: '#00E5CC' },
    ],
    description: 'Annual peace marathon through the heart of Algiers. 5K, 10K, and full marathon options.',
    xpReward: 200,
  },
  {
    id: '20',
    title: 'WOMEN IN TECH CONFERENCE',
    type: 'science',
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=450&fit=crop',
    organizer: 'WIT_DZ',
    orgAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'MAR 08, 2026',
    time: '09:00',
    location: 'Convention Center',
    city: 'Algiers',
    capacity: 200,
    registered: 178,
    countdown: '18D 04H',
    isLive: false,
    signals: [
      { type: 'interest', text: 'Tech + Leadership match', color: '#FFD700' },
      { type: 'social', text: 'Sarah is speaking', color: '#FF2D78' },
    ],
    description: 'Celebrating women leading in technology across Algeria. Keynotes, panels, networking.',
    xpReward: 150,
    speakers: [
      { name: 'SARAH M.', title: 'CEO, TECHSTARTUP', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
      { name: 'AMINA R.', title: 'AI RESEARCHER', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
    ],
  },
  {
    id: '21',
    title: 'ORPHANAGE VISIT & SUPPORT',
    type: 'charity',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&h=450&fit=crop',
    organizer: 'HEARTS_UNITED',
    orgAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    orgVerified: true,
    date: 'FEB 08, 2026',
    time: '10:00',
    location: 'Dar El Amal Center',
    city: 'Bejaia',
    capacity: 30,
    registered: 24,
    countdown: '14D 22H',
    isLive: false,
    signals: [
      { type: 'social', text: 'Omar is organizing', color: '#FF2D78' },
    ],
    description: 'Spend a day with children, bring supplies, and share joy. Small actions, big impact.',
    xpReward: 300,
    fundraisingGoal: 150000,
    fundraisingCurrent: 98000,
  },
];

export const badges: BadgeItem[] = [
  { id: '1', name: 'First Steps', rarity: 'common', earned: true, icon: '○', color: '#6B7280', earnedAt: 'Dec 2024' },
  { id: '2', name: 'Social Butterfly', rarity: 'common', earned: true, icon: '○', color: '#FF2D78', earnedAt: 'Jan 2025' },
  { id: '3', name: 'Code Warrior', rarity: 'rare', earned: true, icon: '△', color: '#00E5CC', earnedAt: 'Mar 2025' },
  { id: '4', name: 'Hackathon Veteran', rarity: 'rare', earned: true, icon: '□', color: '#00E5CC', earnedAt: 'May 2025' },
  { id: '5', name: 'Community Hero', rarity: 'epic', earned: true, icon: '△', color: '#8B5CF6', earnedAt: 'Jul 2025' },
  { id: '6', name: 'Event Pioneer', rarity: 'common', earned: true, icon: '○', color: '#FF4D4D', earnedAt: 'Aug 2025' },
  { id: '7', name: 'Volunteer Star', rarity: 'rare', earned: true, icon: '△', color: '#00E5CC', earnedAt: 'Sep 2025' },
  { id: '8', name: 'Knowledge Seeker', rarity: 'common', earned: true, icon: '□', color: '#3B82F6', earnedAt: 'Oct 2025' },
  { id: '9', name: 'Team Player', rarity: 'rare', earned: true, icon: '○', color: '#FF2D78', earnedAt: 'Nov 2025' },
  { id: '10', name: 'Grand Slam', rarity: 'legendary', earned: false, icon: '◇', color: '#FFD700' },
  { id: '11', name: '1000 Karma', rarity: 'legendary', earned: false, icon: '○', color: '#FFD700' },
  { id: '12', name: 'Globe Trotter', rarity: 'epic', earned: false, icon: '△', color: '#8B5CF6' },
  { id: '13', name: 'Speed Runner', rarity: 'rare', earned: false, icon: '□', color: '#00E5CC' },
  { id: '14', name: 'Night Owl', rarity: 'common', earned: false, icon: '○', color: '#6B7280' },
  { id: '15', name: 'Early Bird', rarity: 'common', earned: false, icon: '△', color: '#6B7280' },
];

export const activities: ActivityItem[] = [
  { id: '1', text: 'Registered for Hackathon 2026 ○', time: '2h ago', color: '#FF2D78', icon: '○' },
  { id: '2', text: "Earned 'Community Hero △' badge", time: '1d ago', color: '#FFD700', icon: '◇' },
  { id: '3', text: 'Completed Volunteer Shift — Logistics △', time: '3d ago', color: '#00E5CC', icon: '△' },
  { id: '4', text: 'Leveled up to Level 7 □', time: '5d ago', color: '#FF4D4D', icon: '□' },
  { id: '5', text: 'Connected with Sarah M. ○', time: '1w ago', color: '#FF2D78', icon: '○' },
  { id: '6', text: 'Attended AI Summit ○', time: '2w ago', color: '#00E5CC', icon: '△' },
  { id: '7', text: '+150 XP earned from AI Summit', time: '2w ago', color: '#FFD700', icon: '◇' },
  { id: '8', text: 'Profile viewed by TechCorp recruiter', time: '3w ago', color: '#FFD700', icon: '◇' },
];

export const skills: SkillItem[] = [
  { name: 'Python', level: 4, verified: true, events: 7, category: 'tech' },
  { name: 'React', level: 3, verified: true, events: 5, category: 'tech' },
  { name: 'Machine Learning', level: 2, verified: true, events: 3, category: 'tech' },
  { name: 'Leadership', level: 3, verified: true, events: 4, category: 'leadership' },
  { name: 'Public Speaking', level: 2, verified: true, events: 2, category: 'social' },
  { name: 'Figma', level: 1, verified: false, events: 0, category: 'creative' },
  { name: 'Node.js', level: 2, verified: true, events: 3, category: 'tech' },
  { name: 'Team Management', level: 2, verified: true, events: 3, category: 'leadership' },
];

export const organizations: OrgItem[] = [
  { id: '1', name: 'APEX LEAGUE', logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face', type: 'TECH CLUB', verified: true, events: 24, followers: 3400 },
  { id: '2', name: 'K-CORP LABS', logo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face', type: 'STARTUP', verified: true, events: 12, followers: 1800 },
  { id: '3', name: 'VIVID INTEL', logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', type: 'AI RESEARCH', verified: true, events: 8, followers: 2200 },
  { id: '4', name: 'CORE LOGIC', logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face', type: 'DEV COMMUNITY', verified: true, events: 15, followers: 4100 },
  { id: '5', name: 'GREEN EARTH', logo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', type: 'NGO', verified: true, events: 32, followers: 5600 },
  { id: '6', name: 'ROBO LEAGUE', logo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', type: 'ENGINEERING', verified: false, events: 6, followers: 900 },
];

export const trendingSkills = [
  { name: 'REACT ARCHITECTURE', size: 'large', color: '#00E5CC' },
  { name: 'NEURAL NETWORKS', size: 'medium', color: '#00E5CC' },
  { name: 'WEB3 SYSTEMS', size: 'medium', color: '#00E5CC' },
  { name: 'CRISIS MEDIATION', size: 'small', color: '#FFD700' },
  { name: 'TEAM STRATEGY', size: 'medium', color: '#FFD700' },
  { name: 'ETHICAL HACK', size: 'small', color: '#FF2D78' },
  { name: 'ARENA MASTER', size: 'large', color: '#FF4D4D' },
  { name: 'SQUAD COMMANDER', size: 'medium', color: '#FF2D78' },
  { name: 'OPS LEAD', size: 'small', color: '#FFD700' },
];
