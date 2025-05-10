import { Request, Response } from 'express';
import {
  getSteamUserGames,
  getSteamUserGameAchievementData,
} from '../services/steamService';
import { getPsnUserGames } from '../services/psnService';
import { countPSNTrophies } from '../utils';

export const getUserLibrary = async (
  req: Request,
  res: Response,
): Promise<any> => {
  // ^needed that any to make the router shut up
  const { steamId, psnId } = req.query;
  if (!steamId && !psnId) {
    return res.status(400).json({ error: 'No user ID provided' });
  }

  let games: Array<any> = [];

  if (steamId) {
    const steamGames = await getSteamUserGames(steamId as string);
    const filteredGames = await Promise.all(
      steamGames.map(async (game: any) => {
        const { earnedAchievements, totalAchievements } =
          await getSteamUserGameAchievementData(game.appid, steamId as string);

        return {
          name: game.name,
          steamId: game.appid,
          store: ['Steam'],
          playingStatus: game.playtime_forever > 0 ? 'playing' : 'not started',
          earnedAchievements,
          totalNumberOfAchievements: totalAchievements,
        };
      }),
    );
    games = [...games, ...filteredGames];
  }

  if (psnId) {
    const psnGames = await getPsnUserGames(psnId as string);
    const filteredGames = psnGames.map((game: any) => ({
      name: game.trophyTitleName,
      store: ['Playstation Store'],
      playingStatus: 'not started',
      earnedAchievements: countPSNTrophies(game.earnedTrophies),
      totalNumberOfAchievements: countPSNTrophies(game.definedTrophies),
    }));
    games = [...games, ...filteredGames];
  }
  res.send(games);
};
