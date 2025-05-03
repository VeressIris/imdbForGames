import { Request, Response } from 'express';
import {
  exchangeNpssoForAccessCode,
  exchangeAccessCodeForAuthTokens,
  getUserTitles,
  getUserTrophiesEarnedForTitle,
} from 'psn-api';

export const authenticate = async (req: Request, res: Response) => {
  const data = await fetch('https://ca.account.sony.com/api/v1/ssocookie');
  const jsonData = await data.json();

  const npsso = jsonData.npsso;
  if (!npsso) {
    res.status(401).json({
      error: 'Make sure that you are logged in.',
    });
  }

  const accessCode = await exchangeNpssoForAccessCode(npsso);
  const authorization = await exchangeAccessCodeForAuthTokens(accessCode);

  res.status(200).json({
    accessToken: authorization,
  });
};

export const getUserGames = async (
  req: Request,
  res: Response,
): Promise<any> => {
  // need that^ nasty ass any type to make the router stfu
  const { authorization } = req.query;

  if (typeof authorization !== 'string' || !authorization) {
    return res.status(400).json({ error: 'Invalid authorization token' });
  }

  const response = await getUserTitles({ accessToken: authorization }, 'me');
  res.status(200).json(response.trophyTitles);
};

export const getUserGameAchievements = async (
  req: Request,
  res: Response,
): Promise<any> => {
  // need that^ nasty ass any type to make the router stfu
  const { authorization, gameId } = req.query;

  if (typeof authorization !== 'string') {
    return res.status(400).json({ error: 'Invalid authorization token' });
  }

  if (typeof gameId !== 'string') {
    return res.status(400).json({ error: 'Invalid game id' });
  }

  const response = await getUserTrophiesEarnedForTitle(
    { accessToken: authorization },
    'me',
    gameId,
    'all',
    { npServiceName: 'trophy' },
  );

  res.status(200).json(response.trophies);
};
