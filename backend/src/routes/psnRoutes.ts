import { Router } from 'express';
import { searchUsers } from '../controllers/psnController';

const router = Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to the imdbForGames PSN middleware API!' });
});

router.get('/searchUsers', searchUsers);

export default router;
