import express from 'express';
import mongoose from 'mongoose';
import Recipe from '../models/Recipe.js';
import auth from '../middleware/auth.js';
import { upload } from '../lib/upload.js';
import User from '../models/User.js';

const router = express.Router();

// Create
router.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    const {
      title,
      ingredients = [],
      steps = [],
      prepTime = 0,
      cookTime = 0,
      cuisine = 'General',
      dietary = [],
      tags = [],
    } = req.body;

    const recipe = await Recipe.create({
      title,
      ingredients: typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients,
      steps: typeof steps === 'string' ? JSON.parse(steps) : steps,
      prepTime: Number(prepTime) || 0,
      cookTime: Number(cookTime) || 0,
      cuisine,
      dietary: typeof dietary === 'string' ? JSON.parse(dietary) : dietary,
      tags: typeof tags === 'string' ? JSON.parse(tags) : tags,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
      author: req.userId,
    });
    res.status(201).json(recipe);
  } catch (e) { next(e); }
});

// Suggested recipes for a user based on favorites, likes, and ratings
router.get('/suggested', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).populate('favorites liked', 'cuisine');

    const cuisines = new Set();
    const interactedIds = new Set();

    (user?.favorites || []).forEach(r => {
      if (!r) return;
      r.cuisine && cuisines.add(r.cuisine);
      interactedIds.add(String(r._id));
    });
    (user?.liked || []).forEach(r => {
      if (!r) return;
      r.cuisine && cuisines.add(r.cuisine);
      interactedIds.add(String(r._id));
    });

    // Also include cuisines and ids from recipes the user has rated
    const rated = await Recipe.find({ 'ratings.user': req.userId }).select('cuisine _id');
    rated.forEach(r => {
      if (!r) return;
      r.cuisine && cuisines.add(r.cuisine);
      interactedIds.add(String(r._id));
    });

    const match = {};
    if (cuisines.size > 0) {
      match.cuisine = { $in: Array.from(cuisines) };
    }
    if (interactedIds.size > 0) {
      match._id = { $nin: Array.from(interactedIds).map(id => new mongoose.Types.ObjectId(id)) };
    }

    const basePipeline = [
      { $addFields: { likesCount: { $size: { $ifNull: ['$likes', []] } } } },
      { $sort: { likesCount: -1, createdAt: -1 } },
      { $limit: 4 }, // show at most 4 suggestions
    ];

    const pipeline = [...(Object.keys(match).length ? [{ $match: match }] : []), ...basePipeline];

    let items = await Recipe.aggregate(pipeline);

    // Fallback: if user has no history or result is empty, suggest top recipes overall,
    // still excluding recipes they already interacted with if we know them.
    if (!items || items.length === 0) {
      const fallbackMatch = interactedIds.size
        ? { _id: { $nin: Array.from(interactedIds).map(id => new mongoose.Types.ObjectId(id)) } }
        : {};
      const fallbackPipeline = [
        ...(Object.keys(fallbackMatch).length ? [{ $match: fallbackMatch }] : []),
        ...basePipeline,
      ];
      items = await Recipe.aggregate(fallbackPipeline);
    }

    res.json({ items });
  } catch (e) { next(e); }
});

// List with filters
router.get('/', async (req, res, next) => {
  try {
    const { cuisine, dietary, q, sort = 'new', maxTime, page = 1, limit = 12 } = req.query;
    const filter = {};
    if (cuisine && cuisine.trim().length > 0) {
      // Case-insensitive cuisine match so "indian" / "Indian" both work
      filter.cuisine = new RegExp(cuisine.trim(), 'i');
    }
    if (dietary) filter.dietary = { $in: dietary.split(',') };
    if (maxTime) filter.$or = [{ prepTime: { $lte: Number(maxTime) } }, { cookTime: { $lte: Number(maxTime) } }];

    // Text search across multiple fields
    if (q && q.trim().length > 0) {
      const rx = new RegExp(q, 'i');
      filter.$and = [
        {
          $or: [
            { title: rx },
            { cuisine: rx },
            { tags: rx },
            { ingredients: rx },
            { steps: rx },
          ],
        },
      ];
    }

    const pg = Math.max(1, parseInt(page));
    const lim = Math.min(50, Math.max(1, parseInt(limit)));
    const skip = (pg - 1) * lim;

    const pipeline = [
      { $match: filter },
      { $addFields: { likesCount: { $size: { $ifNull: ['$likes', []] } } } },
    ];
    if (sort === 'popular' || sort === 'trending') {
      pipeline.push({ $sort: { likesCount: -1, createdAt: -1 } });
    } else {
      pipeline.push({ $sort: { createdAt: -1 } });
    }
    pipeline.push(
      {
        $facet: {
          items: [{ $skip: skip }, { $limit: lim }],
          totalCount: [{ $count: 'count' }]
        }
      }
    );

    const result = await Recipe.aggregate(pipeline);
    const items = result[0]?.items || [];
    const total = result[0]?.totalCount?.[0]?.count || 0;
    const hasMore = skip + items.length < total;
    res.json({ items, page: pg, limit: lim, total, hasMore });
  } catch (e) { next(e); }
});

// Read one
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Recipe.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (e) { next(e); }
});

// Update
router.patch('/:id', auth, upload.single('image'), async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Not found' });
    if (String(recipe.author) !== req.userId) return res.status(403).json({ message: 'Forbidden' });

    const body = { ...req.body };
    ['ingredients', 'steps', 'dietary', 'tags'].forEach((k) => {
      if (body[k] && typeof body[k] === 'string') body[k] = JSON.parse(body[k]);
    });
    if (req.file) body.imageUrl = `/uploads/${req.file.filename}`;

    Object.assign(recipe, body);
    await recipe.save();
    res.json(recipe);
  } catch (e) { next(e); }
});

// Delete
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Not found' });
    if (String(recipe.author) !== req.userId) return res.status(403).json({ message: 'Forbidden' });
    await recipe.deleteOne();
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Like / Unlike
router.post('/:id/like', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Not found' });
    const has = recipe.likes.some((u) => String(u) === req.userId);
    if (has) recipe.likes = recipe.likes.filter((u) => String(u) !== req.userId);
    else recipe.likes.push(req.userId);
    await recipe.save();
    // Keep user's liked list in sync
    if (has) {
      await User.findByIdAndUpdate(req.userId, { $pull: { liked: recipe._id } });
    } else {
      await User.findByIdAndUpdate(req.userId, { $addToSet: { liked: recipe._id } });
    }
    res.json({ likes: recipe.likes.length, liked: !has });
  } catch (e) { next(e); }
});

// Favorite
router.post('/:id/favorite', auth, async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Not found' });
    await User.findByIdAndUpdate(req.userId, { $addToSet: { favorites: recipe._id } });
    res.json({ ok: true });
  } catch (e) { next(e); }
});

// Rate
router.post('/:id/rate', auth, async (req, res, next) => {
  try {
    let { stars = 5, comment = '' } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Not found' });
    // clamp and round to nearest 0.5
    stars = Math.max(0.5, Math.min(5, Number(stars)));
    stars = Math.round(stars * 2) / 2;
    const existing = recipe.ratings.find((r) => String(r.user) === req.userId);
    if (existing) {
      existing.stars = stars;
      existing.comment = comment;
    } else {
      recipe.ratings.push({ user: req.userId, stars, comment });
    }
    await recipe.save();
    const ratings = recipe.ratings || [];
    const avg = ratings.length ? ratings.reduce((a,b)=>a + (b.stars||0), 0) / ratings.length : 0;
    res.json({ ok: true, ratings, average: Number(avg.toFixed(2)) });
  } catch (e) { next(e); }
});

export default router;
