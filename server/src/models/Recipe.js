import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, default: '' },
  },
  { timestamps: true }
);

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    ingredients: { type: [String], default: [] },
    steps: { type: [String], default: [] },
    prepTime: { type: Number, default: 0 },
    cookTime: { type: Number, default: 0 },
    cuisine: { type: String, default: 'General' },
    dietary: { type: [String], default: [] },
    imageUrl: { type: String, default: '' },
    tags: { type: [String], default: [] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    ratings: [ratingSchema],
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Recipe', recipeSchema);
