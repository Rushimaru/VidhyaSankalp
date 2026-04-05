import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verify JWT token
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return res.status(401).json({ message: 'Not authorized, no token.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found.' });
    if (!req.user.isActive) return res.status(403).json({ message: 'Account is disabled.' });
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid or expired.' });
  }
};

// Role-based guard — usage: requireRole('superadmin', 'admin')
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated.' });
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: `Access denied. Required role: ${roles.join(' or ')}.` });
  }
  next();
};

// Institution tenant guard — ensures user belongs to the requested institution
export const requireSameInstitution = (req, res, next) => {
  const role = req.user?.role;
  if (role === 'superadmin') return next(); // superadmin bypasses
  const institutionId = req.params.institutionId || req.body.institutionId || req.query.institutionId;
  if (institutionId && institutionId !== req.user.institutionId?.toString()) {
    return res.status(403).json({ message: 'Access denied. Institution mismatch.' });
  }
  next();
};