const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); 

// Fetch Latest Blogs
router.get('/latest', async (req, res, next) => {
  try {
    const latestBlogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(latestBlogs);
  } catch (err) {
    next(err);
  }
});

// Create a New Blog
router.post('/', async (req, res, next) => {
  try {
    const newBlog = new Blog(req.body);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    next(err);
  }
});

// Fetch Single Blog by ID
router.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    next(err);
  }
});

// Update Blog
router.put('/:id', async (req, res, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(updatedBlog);
  } catch (err) {
    next(err);
  }
});

// Delete Blog
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    next(err);
  }
});
// Fetch All Blogs
router.get('/', async (req, res, next) => {
    try {
      const allBlogs = await Blog.find({});
      res.json(allBlogs);
    } catch (err) {
      next(err);
    }
  });
  
  // Fetch Blogs by Author
router.get('/author/:authorName', async (req, res, next) => {
    try {
      const authorBlogs = await Blog.find({ author: req.params.authorName });
      res.json(authorBlogs);
    } catch (err) {
      next(err);
    }
});
  
  // Fetch Blogs by Category
router.get('/category/:categoryName', async (req, res, next) => {
    try {
      const categoryBlogs = await Blog.find({ category: req.params.categoryName });
      res.json(categoryBlogs);
    } catch (err) {
      next(err);
    }
});
  
  // Fetch Blogs by Tag
router.get('/tag/:tagName', async (req, res, next) => {
    try {
      const tagBlogs = await Blog.find({ tags: req.params.tagName });
      res.json(tagBlogs);
    } catch (err) {
      next(err);
    }
});
  
  // Add more blog-related routes as needed...
  
module.exports = router;
  