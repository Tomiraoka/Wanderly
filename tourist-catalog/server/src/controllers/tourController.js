const Tour = require('../models/Tour');

exports.getTours = async (req, res, next) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    next(error);
  }
};

exports.getTourById = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id).populate('reviews.user', 'name avatar role');
    if (!tour) return res.status(404).json({ message: 'Тур не найден' });
    res.json(tour);
  } catch (error) {
    next(error);
  }
};

exports.createTour = async (req, res, next) => {
  try {
    const { title, location, duration, price, description, included, hotel, imageUrl, userId } = req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : imageUrl;

    const tour = await Tour.create({
      title, location, duration, price, description, included, hotel, image: imagePath, createdBy: userId
    });

    res.status(201).json(tour);
  } catch (error) {
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { userId, text } = req.body;
    const tour = await Tour.findById(req.params.id);

    if (!tour) return res.status(404).json({ message: 'Тур не найден' });

    const review = {
      user: userId,
      text: text
    };

    tour.reviews.push(review);
    await tour.save();

    const updatedTour = await Tour.findById(req.params.id).populate('reviews.user', 'name avatar');
    res.status(201).json(updatedTour);
  } catch (error) {
    next(error);
  }
};

exports.deleteTour = async (req, res, next) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: 'Тур не найден' });
    res.json({ message: 'Тур успешно удален' });
  } catch (error) {
    next(error);
  }
};

exports.updateTour = async (req, res, next) => {
  try {
    const { title, location, duration, price, description, included, hotel, imageUrl } = req.body;
    
    let updateData = { title, location, duration, price, description, included, hotel };
    
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      updateData.image = imageUrl;
    }

    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!updatedTour) return res.status(404).json({ message: 'Тур не найден' });
    res.json(updatedTour);
  } catch (error) {
    next(error);
  }
};