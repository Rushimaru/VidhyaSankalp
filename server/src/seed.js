/**
 * Seed Script — creates superadmin + default subscription plans
 * Run: node src/seed.js
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import SubscriptionPlan from './models/SubscriptionPlan.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  // ── Create Subscription Plans
  const plans = [
    {
      name: 'Basic',
      price: 2999,
      maxStudents: 500,
      maxFaculty: 30,
      features: [
        'Student Management',
        'Attendance Tracking',
        'Basic Fee Tracking',
        'Study Materials Upload',
        'Assignment Management',
        'Email Notifications',
      ],
      description: 'Perfect for small schools and institutions',
    },
    {
      name: 'Pro',
      price: 7999,
      maxStudents: 5000,
      maxFaculty: 200,
      features: [
        'Everything in Basic',
        'Advanced Reports & Analytics',
        'Timetable Management',
        'Multi-Year Academic Management',
        'Bulk Student Import (Excel)',
        'Priority Support',
        'Custom Branding',
      ],
      description: 'For large schools, colleges, and chains',
    },
  ];

  for (const plan of plans) {
    await SubscriptionPlan.findOneAndUpdate({ name: plan.name }, plan, { upsert: true, new: true });
    console.log(`✅ Plan upserted: ${plan.name}`);
  }

  // ── Create Super Admin
  const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL || 'superadmin@vidhyasankalp.com';
  const SUPER_ADMIN_PASS  = process.env.SUPER_ADMIN_PASS  || 'SuperAdmin@123';

  const existing = await User.findOne({ email: SUPER_ADMIN_EMAIL });
  if (existing) {
    console.log(`⚠️  Super admin already exists: ${SUPER_ADMIN_EMAIL}`);
  } else {
    await User.create({
      name: 'Super Admin',
      email: SUPER_ADMIN_EMAIL,
      password: SUPER_ADMIN_PASS,
      role: 'superadmin',
      isVerified: true,
      isActive: true,
    });
    console.log(`✅ Super admin created: ${SUPER_ADMIN_EMAIL} / ${SUPER_ADMIN_PASS}`);
  }

  console.log('\n🎉 Seed complete! You can now login as superadmin.\n');
  process.exit(0);
};

seed().catch(err => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});