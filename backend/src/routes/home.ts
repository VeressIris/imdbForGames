import { Router } from 'express';
import { getUserLibrary } from '../controllers/userDataController';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the imdbForGames API!' });
});
router.get('/getUserLibrary', getUserLibrary);

export default router;
