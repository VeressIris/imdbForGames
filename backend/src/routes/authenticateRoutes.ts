import { Router } from 'express';
import { authenticate, returnAuth } from '../controllers/steamController';

const router = Router();

router.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Welcome to the imdbForGames authentication route API!' });
});

router.get('/steam', authenticate, function (req, res) {
  res.redirect('/');
});
router.get('/steam/authReturn', authenticate, returnAuth);

export default router;
