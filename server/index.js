import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/basecamp';
const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT
});

app.get('/api/', async (req, res) => {
  const visits = await redis.incr('visits');
  res.json({ message: 'Hello from Basecamp!', visits });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
    await redis.ping();
    console.log('Connected to Redis');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

start();
