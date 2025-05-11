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

  try {
    const games = await compileUserLibrary(steamId as string, psnId as string);

    for (const game of games) {
      try {
        await addOwnedGame(game, '21');
      } catch (error) {
        console.error('Error adding owned game:', error);
      }
    }

    res.status(200).json(games);
  } catch (error) {
    console.error('Error saving user library:', error);
    res.status(500).json({ error: 'Failed to save user library' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    console.log('User data received:', userData);

    // TODO: fix this to integrate with clerk and all the other data
    const user = new User({
      username: userData.username,
      clerkId: 1,
    });

    await user.save();
    console.log('User saved to database');
    res.status(200).json({ message: 'User added to database' });
  } catch (error) {
    console.error('Error saving user to database:', error);
    res.status(500).json({ error: 'Failed to add user to database' });
  }
};

export const addGameToLibrary = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const gameData = req.body;
    const userId = req.query.userId;

    await addOwnedGame(gameData, userId as string);

    res.status(200).json({ message: 'Game added to library' });
  } catch (error) {
    console.error('Error adding game to library:', error);
    res.status(500).json({ error: 'Failed to add game to library' });
  }
};

export const getUserLibrary = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const userId = req.query.userId; // replace this with clerkId
    if (!userId) {
      return res.status(400).json({ error: 'No user ID provided' });
    }

    const user = await User.findOne({ clerkId: userId }).exec();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.ownedGames);
  } catch (error) {
    console.error('Error fetching user library:', error);
    res.status(500).json({ error: 'Failed to fetch user library' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<any> => {
  const formData = req.body;
  const userId = '1'; // this should be replaced with the userId from the auth lib

  const user = await User.findOne({ clerkId: userId }).exec();
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.username = formData.username ?? user.username;
  user.psnId = formData.psnId ?? user.psnId;
  user.description = formData.description ?? user.description;
  // see ab profile picture

  try {
    await user.save();
    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Failed to update user' });
  }
};
