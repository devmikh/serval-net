import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import router from './src/routes';
import passport from './src/config/passport';
const MySQLStore = require('express-mysql-session')(session);

import dotenv from 'dotenv';
dotenv.config();

const options = {
	host: process.env.DB_HOST,
	port: 3306,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
};

const sessionStore = new MySQLStore(options);

const app = express();

// Enable middleware
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
