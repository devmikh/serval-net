import express from 'express';
import cors from 'cors';
// import connection from './config/db';
const port = 3030;

import User from './src/user/UserModel';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// connection.connect(function(err) {
//     if (err) {
//       console.error('Database connection failed: ' + err.stack);
//       return;
//     }
  
//     console.log('Connected to database.');
// });

// connection.end();

// app.get('/', async (req, res) => {
//     const newUser = await User.create({
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         password: 'password123'
//       });
//     res.json({user: newUser});
// });

app.get('/api', (req, res, next) => {
    res.json({ data: "test"});
});

app.post('/api/register', async (req, res, next) => {
    console.log("req.body", req.body);
    res.json({ data: req.body });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
