import { Router } from 'express';
import {
  compileUserLibrary,
  addUser,
  addGameToLibrary,
} from '../controllers/userDataController';
import { searchUsers } from '../controllers/psnController';

const router = Router();

router.post('/', addUser);
router.post('/game', addGameToLibrary);
router.post('/library', compileUserLibrary);
router.get('/psn', searchUsers);

export default router;
