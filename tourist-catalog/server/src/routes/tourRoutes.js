const express = require('express');
const router = express.Router();

const { 
  getTours, 
  getTourById, 
  createTour, 
  addComment, 
  updateTour, 
  deleteTour 
} = require('../controllers/tourController');

const upload = require('../middlewares/upload'); 

router.route('/')
  .get(getTours)
  .post(upload.single('image'), createTour);

router.route('/:id')
  .get(getTourById)
  .put(upload.single('image'), updateTour)
  .delete(deleteTour);

router.route('/:id/comments').post(addComment);

module.exports = router;