const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog, likeBlog } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);

// Protected routes
router.post('/', authMiddleware, createBlog);
router.put('/:id', authMiddleware, updateBlog);
router.delete('/:id', authMiddleware, deleteBlog);
router.post('/:id/like', authMiddleware, likeBlog);

module.exports = router;
