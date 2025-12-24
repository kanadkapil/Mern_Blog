const Blog = require("../models/Blog");
const User = require("../models/User");

const generateSlug = (title) => {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-") +
    "-" +
    Math.random().toString(36).substring(2, 10)
  );
};

const createBlog = async (req, res) => {
  try {
    const { title, content, coverImage, hashtags, visibility } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const slug = generateSlug(title);

    const newBlog = new Blog({
      title,
      slug,
      content,
      coverImage: coverImage || "",
      hashtags: hashtags || [],
      author: req.user.id,
      authorName: req.user.username,
      visibility: visibility || "public",
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const { search, tag } = req.query;
    let query = { visibility: "public" };

    // Search logic
    if (search) {
      query.$text = { $search: search };
    }

    // Hashtag filter
    if (tag) {
      query.hashtags = tag;
    }

    // Find active authors
    const activeUsers = await User.find({ "profile.isActive": true }).select(
      "_id"
    );
    const activeUserIds = activeUsers.map((u) => u._id);
    query.author = { $in: activeUserIds };

    const blogs = await Blog.find(query).sort({ createdAt: -1 }).limit(20);

    // Trending algorithm: likes + recency (simplified for MongoDB)
    // In a real app, this might be a more complex aggregation
    const trendingBlogs = await Blog.find(query)
      .sort({ likes: -1, createdAt: -1 })
      .limit(10);

    res.json({
      latest: blogs,
      trending: trendingBlogs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug }).populate(
      "author",
      "username profile"
    );

    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Check visibility
    if (
      blog.visibility === "private" &&
      (!req.user || blog.author.toString() !== req.user.id)
    ) {
      return res.status(403).json({ message: "This blog is private" });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, coverImage, hashtags, visibility } = req.body;

    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    if (title) {
      blog.title = title;
      // Optionally update slug if title changes
      // blog.slug = generateSlug(title);
    }
    if (content) blog.content = content;
    if (coverImage !== undefined) blog.coverImage = coverImage;
    if (hashtags) blog.hashtags = hashtags;
    if (visibility) blog.visibility = visibility;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await Blog.findByIdAndDelete(id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const isLiked = blog.likedBy.includes(userId);

    if (isLiked) {
      // Unlike
      blog.likedBy = blog.likedBy.filter((id) => id.toString() !== userId);
      blog.likes = Math.max(0, blog.likes - 1);
    } else {
      // Like
      blog.likedBy.push(userId);
      blog.likes += 1;
    }

    await blog.save();
    res.json({ likes: blog.likes, liked: !isLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
  likeBlog,
};
