import { getHeaders } from '../utils';

export const getGameCoverUrl = async (gameName: string): Promise<string> => {
  const res = await fetch('https://api.igdb.com/v4/games', {
    method: 'POST',
    headers: getHeaders(),
    body: `search "${gameName}";\nfields name, cover.url, artworks;`,
  });

  if (!res.ok) {
    console.error(`IGDB error: ${res.status} ${res.statusText}`);
    return '';
  }

  const json = await res.json();

  if (!json.length || !json[0]?.cover?.url) {
    console.warn(`No cover found for game: "${gameName}"`);
    return '';
  }

  return 'https:' + json[0].cover.url.replace('t_thumb', 't_cover_big');
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let lastCall = 0;
const RATE_LIMIT_MS = 333;

export const rateLimitedGetGameCoverUrl = async (
  gameName: string,
): Promise<string> => {
  const now = Date.now();
  const waitTime = Math.max(0, RATE_LIMIT_MS - (now - lastCall));
  await delay(waitTime);
  lastCall = Date.now();

  return getGameCoverUrl(gameName);
};
