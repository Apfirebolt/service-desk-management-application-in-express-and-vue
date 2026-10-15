import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.ts';

// Augment Express Request interface globally so req.user is recognized project-wide
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// @desc    Protect routes (Verify JWT token)
const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const secret = process.env.JWT_SECRET || '';
      const decoded = jwt.verify(token, secret) as JwtPayload & { id: string };

      req.user = await User.findById(decoded.id).select('-password');

      next();
      return;
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// @desc    Admin only middleware
const admin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };