import { Router } from 'express';
import {
  authenticate,
  getUserGames,
  getUserGameAchievements,
} from '../controllers/psnController';

const router = Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to the imdbForGames PSN middleware API!' });
});

router.get('/authenticate', authenticate);
router.get('/getUserGames', getUserGames);
router.get('/getUserGameAchievements', getUserGameAchievements);

export default router;
