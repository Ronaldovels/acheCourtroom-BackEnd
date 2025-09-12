import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const API = process.env.API_URL;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

import analiseRoutes from './routes/analise.js';
app.use('/analise', analiseRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const keepAlive = () => {
    axios.get(API)
        .then(() => console.log('Pinged API to keep alive'))
        .catch((err) => console.error('Error pinging API:', err));
}
        
setInterval(keepAlive, 5 * 60 * 1000); // Ping every 5 minutes
