import express from 'express';
const port = 3000;

const app = express();

app.get('/', (req, res) => {
    res.send('serval-net2');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
