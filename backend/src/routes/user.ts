import { Router } from 'express';
import {
  saveUserLibrary,
  addUser,
  addGameToLibrary,
  getUserLibrary,
} from '../controllers/userDataController';
import { searchUsers } from '../controllers/psnController';

const router = Router();

router.post('/', addUser);
router.post('/game', addGameToLibrary);
router.post('/library', saveUserLibrary);
router.get('/library', getUserLibrary);
router.get('/psn', searchUsers);

export default router;
