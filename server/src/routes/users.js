import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
import { upload } from '../lib/upload.js';

const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password').populate('favorites liked', 'title imageUrl');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (e) { next(e); }
});

router.patch('/me', auth, upload.single('avatar'), async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (req.file) {
      updates.avatarUrl = `/uploads/${req.file.filename}`;
    }
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
    res.json(user);
  } catch (e) { next(e); }
});

export default router;
