import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.create({
  name: 'Admin User',
  email: 'admin@example.com',
  password: 'password',   // 👈 plain text - hook will hash it automatically
  role: 'Admin',
});

console.log('✅ Seed user created');
await mongoose.disconnect();