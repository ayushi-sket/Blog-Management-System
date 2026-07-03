const express = require("express");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware("Author", "Admin"),
  async (req, res) => {
    try {
      const { title, content, category, status } = req.body;

      if (!title || !content || !category) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const blog = await Blog.create({
        title,
        content,
        category,
        author: req.user._id,
        status: status || "Draft"
      });

      res.status(201).json({
        message: "Blog created successfully",
        blog
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.get("/approved", async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "Approved" })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Approved blogs fetched successfully",
      blogs
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get(
  "/my-blogs",
  authMiddleware,
  roleMiddleware("Author", "Admin"),
  async (req, res) => {
    try {
      const blogs = await Blog.find({ author: req.user._id }).sort({
        createdAt: -1
      });

      res.status(200).json({
        message: "Your blogs fetched successfully",
        blogs
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email role"
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const comments = await Comment.find({ blog: blog._id })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Blog fetched successfully",
      blog,
      comments
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("Author", "Admin"),
  async (req, res) => {
    try {
      const { title, content, category, status } = req.body;

      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (
        req.user.role !== "Admin" &&
        blog.author.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ message: "You can edit only your own blog" });
      }

      blog.title = title || blog.title;
      blog.content = content || blog.content;
      blog.category = category || blog.category;

      if (status) {
        blog.status = status;
      }

      await blog.save();

      res.status(200).json({
        message: "Blog updated successfully",
        blog
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("Author", "Admin"),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (
        req.user.role !== "Admin" &&
        blog.author.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ message: "You can delete only your own blog" });
      }

      await Comment.deleteMany({ blog: blog._id });
      await blog.deleteOne();

      res.status(200).json({
        message: "Blog deleted successfully"
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.put(
  "/:id/submit",
  authMiddleware,
  roleMiddleware("Author"),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "You can submit only your own blog" });
      }

      blog.status = "Pending";
      await blog.save();

      res.status(200).json({
        message: "Blog submitted for approval",
        blog
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.put(
  "/:id/approve",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      blog.status = "Approved";
      await blog.save();

      res.status(200).json({
        message: "Blog approved successfully",
        blog
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.put(
  "/:id/reject",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      blog.status = "Rejected";
      await blog.save();

      res.status(200).json({
        message: "Blog rejected successfully",
        blog
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.put(
  "/:id/like",
  authMiddleware,
  roleMiddleware("Reader", "Author", "Admin"),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (blog.status !== "Approved") {
        return res.status(400).json({ message: "Only approved blogs can be liked" });
      }

      const userId = req.user._id.toString();

      blog.dislikes = blog.dislikes.filter(
        (id) => id.toString() !== userId
      );

      const alreadyLiked = blog.likes.some(
        (id) => id.toString() === userId
      );

      if (alreadyLiked) {
        blog.likes = blog.likes.filter(
          (id) => id.toString() !== userId
        );
      } else {
        blog.likes.push(req.user._id);
      }

      await blog.save();

      res.status(200).json({
        message: alreadyLiked ? "Like removed" : "Blog liked",
        likes: blog.likes.length,
        dislikes: blog.dislikes.length
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.put(
  "/:id/dislike",
  authMiddleware,
  roleMiddleware("Reader", "Author", "Admin"),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (blog.status !== "Approved") {
        return res.status(400).json({ message: "Only approved blogs can be disliked" });
      }

      const userId = req.user._id.toString();

      blog.likes = blog.likes.filter(
        (id) => id.toString() !== userId
      );

      const alreadyDisliked = blog.dislikes.some(
        (id) => id.toString() === userId
      );

      if (alreadyDisliked) {
        blog.dislikes = blog.dislikes.filter(
          (id) => id.toString() !== userId
        );
      } else {
        blog.dislikes.push(req.user._id);
      }

      await blog.save();

      res.status(200).json({
        message: alreadyDisliked ? "Dislike removed" : "Blog disliked",
        likes: blog.likes.length,
        dislikes: blog.dislikes.length
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;