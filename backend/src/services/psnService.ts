import {
  exchangeNpssoForAccessCode,
  getUserTitles,
  exchangeAccessCodeForAuthTokens,
} from 'psn-api';

export const getAuth = async () => {
  const accessCode = exchangeNpssoForAccessCode(
    process.env.PSN_NPSSO as string,
  );

  const authorization = await exchangeAccessCodeForAuthTokens(await accessCode);
  return authorization;
};

export const getPsnUserGames = async (psnId: string) => {
  const authorization = await getAuth();
  const response = await getUserTitles(
    { accessToken: authorization.accessToken },
    psnId,
  );

  const allGames = response.trophyTitles;
  const filteredGames = allGames.filter(
    (game: any) =>
      !game.trophyTitlePlatform.includes('PSPC') &&
      !game.trophyTitleName.includes('Trophies'),
  );
  return filteredGames;
};
