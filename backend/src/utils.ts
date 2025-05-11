export const STEAM_API_URL = 'http://api.steampowered.com';
export const getHeaders = () => ({
  'Client-ID': process.env.TWITCH_CLIENT_ID!,
  Authorization: `Bearer ${process.env.IGDB_ACCESS_TOKEN}`,
});

interface PSNTrophies {
  bronze: number;
  silver: number;
  gold: number;
  platinum: number;
}

export function countPSNTrophies(trophies: PSNTrophies): number {
  return trophies.bronze + trophies.silver + trophies.gold + trophies.platinum;
}

enum PlayingStatus {
  PLAYING = 'playing',
  FINISHED = 'finished',
  NOT_STARTED = 'not started',
  COMPLETED = '100%',
}

export function setPlayingStatus(
  playtime: number | undefined,
  earnedAchievements: number,
  totalAchievements: number,
): PlayingStatus {
  let status = PlayingStatus.NOT_STARTED;
  if ((playtime ?? 0) > 0 || earnedAchievements > 0) {
    return PlayingStatus.PLAYING;
  }
  if (earnedAchievements === totalAchievements) {
    return PlayingStatus.COMPLETED;
  }

  return status;
}

export function cleanUpPSNNames(name: string): string {
  return name.replace(/[^a-zA-Z0-9 .,;:'"!?()\-]/g, '');
}

export function getStoresFromPlatforms(platforms: JSON[]): string[] {
  const stores: string[] = [];
  platforms.forEach((platform: any) => {
    switch (platform.name) {
      case 'PC':
        stores.push('Steam');
        break;
      case 'PS4':
      case 'PS5':
        stores.push('Playstation Store');
        break;
      case 'XBOX':
        stores.push('Xbox Store');
        break;
      case 'SWITCH':
        stores.push('Nintendo eShop');
        break;
      default:
        stores.push('Unknown Store');
    }
  });
  return stores;
}
