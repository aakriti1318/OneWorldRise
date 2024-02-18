const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.post('/', async (req, res, next) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const allBlogs = await Blog.find({});
        res.json(allBlogs);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
