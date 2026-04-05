import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import crypto from 'crypto';

// @desc    Login user (all roles: superadmin, admin, faculty, student)
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email before logging in.' });
    }
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account has been deactivated. Contact your administrator.' });
    }
    res.json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        institutionId: user.institutionId,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Register user (creates admin for new institution, or self-register)
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await User.create({ name, email, password, otp, otpExpiry, isVerified: false, role: 'admin' });
    console.log(`OTP for ${email}: ${otp}`);
    res.status(201).json({ message: 'OTP sent to your email. Please verify.' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (user.isVerified) return res.status(400).json({ message: 'Email already verified.' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP.' });
    if (user.otpExpiry < new Date()) return res.status(400).json({ message: 'OTP has expired.' });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({
      message: 'Email verified successfully.',
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        institutionId: user.institutionId,
      },
    });
  } catch (error) {
    console.error('OTP verify error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};