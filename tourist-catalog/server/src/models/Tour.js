const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  included: { type: String },
  hotel: { type: String },
  image: { type: String }, 
  reviews: [reviewSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Tour', tourSchema);