import {
  getSteamUserGames,
  getSteamUserGameAchievementData,
} from '../services/steamService';
import { getPsnUserGames } from '../services/psnService';
import {
  countPSNTrophies,
  setPlayingStatus,
  cleanUpPSNNames,
  getStoresFromPlatforms,
} from '../utils';
import User from '../models/User';
import Game from '../models/Game';
import {
  getCoreGameData,
  rateLimitedGetGameCoverUrl,
} from '../services/igdbService';
import pLimit from 'p-limit';

const limit = pLimit(3);

export const compileUserLibrary = async (
  steamId: string | undefined,
  psnId: string | undefined,
) => {
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
            store: 'Steam',
            platform: 'PC',
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
            store: 'Playstation Store',
            platforms: game.trophyTitlePlatform,
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

  return games;
};

export const addOwnedGame = async (game: any, userId: string) => {
  const user = await User.findOne({ clerkId: userId }).exec();
  if (!user) {
    throw new Error('User not found');
  }

  let coreGame = await Game.findOne({
    name: game.name,
  }).exec();

  if (!coreGame) {
    const coreGameData = await getCoreGameData(game.name); // getting core game data from igdb

    coreGame = await Game.create({
      name: game.name,
      coverUrl: game.coverUrl,
      stores: getStoresFromPlatforms(coreGameData.platforms),
      platforms: coreGameData.platforms.map((platform: any) => platform.name),
      totalNumberOfAchievements: game.totalNumberOfAchievements,
      genres: coreGameData.genres.map((genre: any) => genre.name),
      description: coreGameData.summary,
      releaseDate: new Date(coreGameData.first_release_date * 1000),
    });

    console.log('Core Game saved to database');
  }

  const gameDoc = {
    name: game.name,
    coverUrl: '',
    coreGame: coreGame._id,
    platform: game.platform,
    store: game.store,
    earnedAchievements: game.earnedAchievements,
    totalNumberOfAchievements: game.totalNumberOfAchievements,
  };

  user.ownedGames.push(gameDoc);

  await user
    .save()
    .then(() => {
      console.log('Game saved to user owned games');
    })
    .catch((err) => {
      console.error('Error saving game to user owned games:', err);
    });
};
