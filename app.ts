import express from 'express';
import connection from './config/db';
const port = 3030;

import User from './src/user/UserModel';

const app = express();

connection.connect(function(err) {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
  
    console.log('Connected to database.');
});

connection.end();

app.get('/', async (req, res) => {
    const newUser = await User.create({
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
      });
    res.json({user: newUser});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
