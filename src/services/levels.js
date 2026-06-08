export const LEVELS = [
  { name: "SEEDLING",       minGP: 0,    icon: "🌱", color: "#86efac", title: "Seedling",       bg: "linear-gradient(135deg, #f0fdf4, #dcfce7)" },
  { name: "SPROUT",         minGP: 50,   icon: "🌿", color: "#4ade80", title: "Sprout",         bg: "linear-gradient(135deg, #dcfce7, #bbf7d0)" },
  { name: "GREEN_WORKER",   minGP: 150,  icon: "♻️", color: "#22c55e", title: "Green Worker",   bg: "linear-gradient(135deg, #bbf7d0, #86efac)" },
  { name: "ECO_WARRIOR",    minGP: 350,  icon: "⚔️", color: "#16a34a", title: "Eco Warrior",    bg: "linear-gradient(135deg, #86efac, #4ade80)" },
  { name: "EARTH_GUARDIAN", minGP: 700,  icon: "🛡️", color: "#15803d", title: "Earth Guardian", bg: "linear-gradient(135deg, #4ade80, #22c55e)" },
  { name: "PLANET_SAVIOR",  minGP: 1200, icon: "🌍", color: "#166534", title: "Planet Savior",  bg: "linear-gradient(135deg, #22c55e, #16a34a)" },
];

export const ACHIEVEMENTS = [
  { id: "first_upload",     title: "First Steps",       description: "Analyzed your first waste image",      icon: "🎯" },
  { id: "ten_uploads",      title: "Getting Serious",    description: "Analyzed 10 waste images",             icon: "📸" },
  { id: "fifty_uploads",    title: "Waste Expert",       description: "Analyzed 50 waste images",             icon: "🔬" },
  { id: "hundred_uploads",  title: "Eco Legend",         description: "Analyzed 100 waste images",            icon: "🏆" },
  { id: "perfect_score",    title: "Perfect Score",      description: "Achieved a score of 100",              icon: "💯" },
  { id: "high_roller",      title: "High Roller",        description: "Earned 500+ GP in one upload",         icon: "💎" },
  { id: "streak_3",         title: "On a Roll",          description: "3-day upload streak",                  icon: "🔥" },
  { id: "streak_7",         title: "Unstoppable",        description: "7-day upload streak",                  icon: "⚡" },
  { id: "streak_30",        title: "Dedication Master",  description: "30-day upload streak",                 icon: "🌟" },
  { id: "gp_100",           title: "Eco Starter",        description: "Earned 100 total GP",                  icon: "🥉" },
  { id: "gp_500",           title: "Eco Enthusiast",     description: "Earned 500 total GP",                  icon: "🥈" },
  { id: "gp_1000",          title: "Eco Master",         description: "Earned 1000 total GP",                 icon: "🥇" },
  { id: "good_segregator",  title: "Good Segregator",    description: "10 GOOD classifications",              icon: "✅" },
  { id: "level_up",         title: "Level Up!",          description: "Reached Green Worker or above",        icon: "⬆️" },
  { id: "first_plant",      title: "First Sprout",       description: "Created your first plantation",        icon: "🌱" },
  { id: "plant_3",          title: "Green Thumb",        description: "Completed 3 plantations",              icon: "🌿" },
  { id: "plant_5",          title: "Master Gardener",    description: "Completed 5 plantations",              icon: "🌳" },
  { id: "plant_perfect",    title: "Perfect Grower",     description: "Completed a plantation with 90+ avg",  icon: "✨" },
  { id: "plant_streak_3",   title: "Dedicated Planter",  description: "3-week plantation streak",             icon: "🔥" },
  { id: "verification_pro", title: "Verification Pro",   description: "Verified 10 plantation codes",         icon: "🔐" },
];

export function getLevelForGP(gp) {
  let level = LEVELS[0];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (gp >= LEVELS[i].minGP) {
      level = LEVELS[i];
      break;
    }
  }
  return level;
}

export function getLevelIndex(gp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (gp >= LEVELS[i].minGP) return i;
  }
  return 0;
}

export function getLevelProgress(gp) {
  const idx = getLevelIndex(gp);
  const current = LEVELS[idx];
  const next = LEVELS[idx + 1] || null;

  if (!next) {
    return { current, next: null, index: idx, totalLevels: LEVELS.length, progress: 100, gpInLevel: gp - current.minGP, gpNeeded: 0 };
  }

  const range = next.minGP - current.minGP;
  const earned = gp - current.minGP;
  const progress = Math.min(Math.round((earned / range) * 100), 100);

  return { current, next, index: idx, totalLevels: LEVELS.length, progress, gpInLevel: earned, gpNeeded: range };
}
