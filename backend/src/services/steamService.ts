import { STEAM_API_URL } from '../utils';

export const getSteamUserGames = async (userId: string) => {
  const data = await fetch(
    `${STEAM_API_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${userId}&include_appinfo=1&include_played_free_games=1`,
  );
  const games = await data.json();
  return games.response.games;
};

export const getSteamUserGameAchievementData = async (
  appId: string,
  userId: string,
) => {
  const data = await fetch(
    `${STEAM_API_URL}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${process.env.STEAM_API_KEY}&steamid=${userId}`,
  );
  const playerStats = await data.json();

  // for games that don't have achivements
  if (playerStats.playerstats.achievements === undefined) {
    return {
      totalAchievements: 0,
      earnedAchievements: 0,
    };
  }

  const earnedAchievements = playerStats.playerstats.achievements.filter(
    (achievement: any) => achievement.achieved === 1,
  );

  return {
    totalAchievements: playerStats.playerstats.achievements.length || 0,
    earnedAchievements: earnedAchievements.length || 0,
  };
};
