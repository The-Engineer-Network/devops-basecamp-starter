import dotenv from 'dotenv';
import Redis from 'ioredis';
import mongoose from 'mongoose';

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/basecamp';

const redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT });

async function connect() {
  await mongoose.connect(MONGO_URI);
  console.log('Worker: connected to MongoDB');
  await redis.ping();
  console.log('Worker: connected to Redis');
}

async function doWork() {
  console.log('Worker: polling for jobs (simulated)...');
  // Simulate work: push a timestamp every 10 seconds
  setInterval(async () => {
    const id = Date.now();
    await redis.lpush('jobs', `job-${id}`);
    console.log('Worker: pushed job', id);
    // trim list
    await redis.ltrim('jobs', 0, 99);
  }, 10000);
}

(async () => {
  try {
    await connect();
    await doWork();
  } catch (err) {
    console.error('Worker error:', err);
    process.exit(1);
  }
})();
