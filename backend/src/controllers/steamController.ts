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
  console.log('steamId', steamId); //TODO: add steamId to user in db
  res.redirect('/');
};
