import express from 'express';
import cors from 'cors';
import router from './src/routes';
const port = 3030;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Define routes
app.use(router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
