import express from 'express';
import connection from './config/db';
const port = 3000;

const app = express();

connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
});

connection.end();

app.get('/', (req, res) => {
    res.send('serval-net2');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
