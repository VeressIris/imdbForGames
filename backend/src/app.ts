import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import session from 'express-session';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import homeRouter from './routes/home';
import steamRouter from './routes/steamRoutes';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// session setup
app.use(
  session({
    secret: 'your secret',
    name: 'name of session id',
    resave: true,
    saveUninitialized: true,
  }),
);

// passport setup
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
});

passport.use(
  new SteamStrategy(
    {
      returnURL: 'http://localhost:3000/steam/authReturn',
      realm: 'http://localhost:3000/',
      apiKey: process.env.STEAM_API_KEY!,
    },
    function (identifier, profile, done) {
      process.nextTick(function () {
        profile.id = identifier; // not sure if .id is what's supposed to be there
        return done(null, profile);
      });
    },
  ),
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
//ex: app.use('/endpoint', endpointRouter);
app.use('/', homeRouter);
app.use('/steam', steamRouter);

// Global error handler
app.use(errorHandler);

export default app;
