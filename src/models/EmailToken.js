const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmailTokenSchema = new Schema(
  {
    token: { type: String, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('EmailToken', EmailTokenSchema);
