import { Request, Response } from 'express';
import User from '../models/User';
import { compileUserLibrary, addOwnedGame } from '../services/userService';

export const saveUserLibrary = async (
  req: Request,
  res: Response,
): Promise<any> => {
  // ^needed that any to make the router shut up
  const { steamId, psnId } = req.query;
  if (!steamId && !psnId) {
    return res.status(400).json({ error: 'No user ID provided' });
  }

  const games = await compileUserLibrary(steamId as string, psnId as string);

  games.forEach(async (game: any) => {
    addOwnedGame(game, '21');
  });

  res.status(200).json(games);
};

export const addUser = async (req: Request, res: Response) => {
  const userData = req.body;
  console.log('User data received:', userData);

  // TODO: fix this to integrate with clerk and all the other data
  const user = new User({
    username: userData.username,
    clerkId: 1,
  });

  user
    .save()
    .then(() => {
      console.log('User saved to database');
    })
    .catch((err) => {
      console.error('Error saving user to database:', err);
    });

  res.status(200).json({ message: 'User added to database' });
};

export const addGameToLibrary = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const gameData = req.body;
  const userId = req.query.userId;

  addOwnedGame(gameData, userId as string);

  res.status(200).json({ message: 'Game added to library' });
};

export const getUserLibrary = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const userId = req.query.userId; // replace this with clerkId
  if (!userId) {
    return res.status(400).json({ error: 'No user ID provided' });
  }

  const user = await User.findOne({ clerkId: userId }).exec();

  return res.status(200).json(user!.ownedGames);
};
