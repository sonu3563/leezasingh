const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');  
const userRoutes = require('./routes/userRoutes');  
const cors = require('cors');
dotenv.config();

const app = express();
const port = 3002;
app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true,
  }));
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));
   
app.use('/api', userRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
