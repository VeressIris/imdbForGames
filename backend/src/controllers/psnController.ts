import { Request, Response } from 'express';
import { makeUniversalSearch } from 'psn-api';
import { getAuth } from '../services/psnService';

// does not return the user that's currently logged in for whatever reason
export const searchUsers = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ error: 'No username provided' });
  }

  const authorization = await getAuth();
  const results = await makeUniversalSearch(
    authorization,
    username as string,
    'SocialAllAccounts',
  );

  return res.status(200).json(results);
};
