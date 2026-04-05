import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  
  const existing = await User.findOne({ email: 'student@demo.school' });
  if (existing) {
    console.log('Student user already exists');
    process.exit(0);
  }

  // Get the institution ID from the admin user
  const admin = await User.findOne({ email: 'admin@demo.school' });
  
  const student = await User.create({
    name: 'Rahul Kumar',
    email: 'student@demo.school',
    password: 'Student@123',
    role: 'student',
    institutionId: admin.institutionId,
    isVerified: true,
    isActive: true,
  });
  
  console.log(`✅ Student user created: ${student.email} / Student@123`);
  process.exit(0);
};

run().catch(e => { console.error(e); process.exit(1); });
