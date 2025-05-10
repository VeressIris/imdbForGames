export const STEAM_API_URL = 'http://api.steampowered.com';

interface PSNTrophies {
  bronze: number;
  silver: number;
  gold: number;
  platinum: number;
}

export function countPSNTrophies(trophies: PSNTrophies): number {
  return trophies.bronze + trophies.silver + trophies.gold + trophies.platinum;
}
