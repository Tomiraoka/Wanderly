const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, addComment } = require('../controllers/blogController');
const upload = require('../middlewares/upload');

router.route('/')
  .get(getBlogs)
  .post(upload.single('image'), createBlog);

router.route('/:id')
  .get(getBlogById)
  .put(upload.single('image'), updateBlog)
  .delete(deleteBlog);

router.route('/:id/comments').post(addComment);

module.exports = router;