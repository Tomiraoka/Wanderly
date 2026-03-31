const Blog = require('../models/Blog');

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name avatar role')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении блогов', error: error.message });
  }
};

exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name avatar role')
      .populate('comments.user', 'name avatar role');
      
    if (!blog) return res.status(404).json({ message: 'Пост не найден' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const { title, content, imageUrl, userId } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : imageUrl;

    const blog = await Blog.create({ title, content, image: imagePath, author: userId });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании поста', error: error.message });
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const { title, content, imageUrl } = req.body;
    let updateData = { title, content };
    if (req.file) updateData.image = `/uploads/${req.file.filename}`;
    else if (imageUrl) updateData.image = imageUrl;

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: 'Пост не найден' });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка обновления', error: error.message });
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Пост не найден' });
    res.json({ message: 'Пост удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка удаления', error: error.message });
  }
};

exports.addComment = async (req, res, next) => {
  try {
    const { userId, text } = req.body;
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) return res.status(404).json({ message: 'Пост не найден' });

    blog.comments.push({ user: userId, text });
    await blog.save();

    const updatedBlog = await Blog.findById(req.params.id)
      .populate('author', 'name avatar role')
      .populate('comments.user', 'name avatar role');
      
    res.status(201).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка добавления комментария', error: error.message });
  }
};