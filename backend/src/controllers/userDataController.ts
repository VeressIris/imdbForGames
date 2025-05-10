import { Request, Response } from 'express';
import {
  getSteamUserGames,
  getSteamUserGameAchievementData,
} from '../services/steamService';
import { getPsnUserGames } from '../services/psnService';
import { countPSNTrophies, setPlayingStatus, cleanUpPSNNames } from '../utils';
import { rateLimitedGetGameCoverUrl } from '../services/igdbService';
import pLimit from 'p-limit';

const limit = pLimit(3);

export const compileUserLibrary = async (
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
      steamGames.map(async (game: any) =>
        limit(async () => {
          const coverUrl = await rateLimitedGetGameCoverUrl(game.name);
          const { earnedAchievements, totalAchievements } =
            await getSteamUserGameAchievementData(
              game.appid,
              steamId as string,
            );

          return {
            name: game.name,
            coverUrl,
            store: ['Steam'],
            platforms: ['PC'],
            playingStatus: setPlayingStatus(
              game.playtime_forever,
              earnedAchievements,
              totalAchievements,
            ),
            earnedAchievements,
            totalNumberOfAchievements: totalAchievements,
          };
        }),
      ),
    );
    games = [...games, ...filteredGames];
  }

  //TODO: see what you can do if the user has a game on steam AND psn

  if (psnId) {
    const psnGames = await getPsnUserGames(psnId as string);
    const filteredGames = await Promise.all(
      psnGames.map(async (game: any) =>
        limit(async () => {
          return {
            name: cleanUpPSNNames(game.trophyTitleName),
            coverUrl: await rateLimitedGetGameCoverUrl(
              cleanUpPSNNames(game.trophyTitleName),
            ),
            store: ['Playstation Store'],
            platforms: game.trophyTitlePlatform.split(','),
            playingStatus: setPlayingStatus(
              undefined,
              countPSNTrophies(game.earnedTrophies),
              countPSNTrophies(game.definedTrophies),
            ),
            earnedAchievements: countPSNTrophies(game.earnedTrophies),
            totalNumberOfAchievements: countPSNTrophies(game.definedTrophies),
          };
        }),
      ),
    );
    games = [...games, ...filteredGames];
  }

  res.send(games);
};
