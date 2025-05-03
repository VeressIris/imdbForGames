import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { STEAM_API_URL } from '../utils';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  passport.authenticate('steam', { failureRedirect: '/' })(req, res, next);
};

export const returnAuth = (req: Request, res: Response, next: NextFunction) => {
  const user: any = req.user;
  const steamId = user._json.steamid;
  console.log('steamId', steamId); //TODO: add steamId to user in db
  res.redirect('/');
};

export const getUserGames = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.query;
  const data = await fetch(
    `${STEAM_API_URL}/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${userId}&include_appinfo=1&include_played_free_games=1`,
  );
  const games = await data.json();
  res.status(200).json(games.response.games);
};

export const getUserGameAchievements = async (req: Request, res: Response) => {
  const { appId, userId } = req.query;
  const data = await fetch(
    `${STEAM_API_URL}/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appId}&key=${process.env.STEAM_API_KEY}&steamid=${userId}`,
  );
  const achievements = await data.json();
  res.status(200).json(achievements);
};
