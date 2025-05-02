import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

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
  console.log('steamId', steamId); //TODO: change in db
  res.redirect('/');
};

export const getUserGames = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { userId } = req.query;
  const data = await fetch(
    `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${userId}&include_appinfo=1&include_played_free_games=1`,
  );
  const games = await data.json();
  console.log('games', games);
  res.status(200).json(games.response.games);
};
