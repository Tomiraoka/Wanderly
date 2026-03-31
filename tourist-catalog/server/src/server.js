const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()

const authRoutes = require('./routes/authRoutes')
const tourRoutes = require('./routes/tourRoutes')
const blogRoutes = require('./routes/blogRoutes')
const flightRoutes = require('./routes/flightRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))

app.use('/api/auth', authRoutes)
app.use('/api/tours', tourRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/flights', flightRoutes)

app.use(errorMiddleware)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})