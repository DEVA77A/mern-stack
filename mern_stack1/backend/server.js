const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/api', (req, res) => {
  res.send('from express');
});

app.post('/api', (req, res) => {
  const temp = req.body;
  res.send(temp);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
