import { Router } from 'express';
import {
  authenticate,
  returnAuth,
  getUserGames,
  getUserGameAchievements,
} from '../controllers/steamController';

const router = Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to the imdbForGames STEAM middleware API!' });
});

router.get('/authenticate', authenticate, function (req, res) {
  res.redirect('/');
});
router.get('/authReturn', authenticate, returnAuth);
router.get('/getUserGames', getUserGames);
router.get('/getUserGameAchievements', getUserGameAchievements);

export default router;
