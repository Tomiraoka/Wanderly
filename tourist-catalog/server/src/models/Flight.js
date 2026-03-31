const mongoose = require('mongoose')

const flightSchema = new mongoose.Schema({
  airline: {
    type: String,
    required: [true, 'Please add airline name']
  },
  flightNumber: {
    type: String,
    required: true,
    unique: true
  },
  from: {
    city: String,
    airport: String,
    code: String
  },
  to: {
    city: String,
    airport: String,
    code: String
  },
  departureTime: {
    type: Date,
    required: true
  },
  arrivalTime: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive']
  },
  availableSeats: {
    type: Number,
    required: true,
    min: [0, 'Available seats must be non-negative']
  },
  class: {
    type: String,
    enum: ['economy', 'business', 'first'],
    default: 'economy'
  },
  stops: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Flight', flightSchema)