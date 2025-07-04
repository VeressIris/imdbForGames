import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import session from 'express-session';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler';
import userRouter from './routes/user';
import authenticateRouter from './routes/authenticateRoutes';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  }),
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

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
      returnURL: 'http://localhost:3000/authenticate/steam/authReturn',
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
app.use('/user', userRouter);
app.use('/authenticate', authenticateRouter);

// Global error handler
app.use(errorHandler);

export default app;
