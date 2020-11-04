const mongoose = require('mongoose');
const paginate = require('../config/mongoose-paginate');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    phone: { type: String, unique: true },
    password: { type: String, select: false },
    active: { type: Boolean, default: true },
    profile_photo: { type: String },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  { timestamps: true }
);

UserSchema.plugin(paginate);

module.exports = mongoose.model('User', UserSchema);
