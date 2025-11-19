import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    bio: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    preferences: {
      cuisine: { type: [String], default: [] },
      dietary: { type: [String], default: [] },
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    roles: { type: [String], default: ['user'] },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('User', userSchema);
