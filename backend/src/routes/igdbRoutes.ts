import { Router } from 'express';
import {} from '../controllers/igdbController';

const router = Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to the imdbForGames IGDB middleware API!' });
});

export default router;
