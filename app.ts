import express from 'express';
import cors from 'cors';
import router from './src/routes';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Enable middleware
const corsOptions = {
    origin: process.env.CLIENT_URL
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Define routes
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
});
