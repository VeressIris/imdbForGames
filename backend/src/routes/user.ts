import { Router } from 'express';
import { compileUserLibrary } from '../controllers/userDataController';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the imdbForGames API!' });
});
router.get('/compileUserLibrary', compileUserLibrary);
// router.post('/compileUserLibrary', compileUserLibrary);

export default router;
