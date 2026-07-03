const express = require("express");
const Blog = require("../models/Blog");
const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
  "/:blogId",
  authMiddleware,
  roleMiddleware("Reader", "Author", "Admin"),
  async (req, res) => {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ message: "Comment text is required" });
      }

      const blog = await Blog.findById(req.params.blogId);

      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      if (blog.status !== "Approved") {
        return res.status(400).json({ message: "You can comment only on approved blogs" });
      }

      const comment = await Comment.create({
        blog: blog._id,
        user: req.user._id,
        text
      });

      res.status(201).json({
        message: "Comment added successfully",
        comment
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);

      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      if (
        req.user.role !== "Admin" &&
        comment.user.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({ message: "You can delete only your own comment" });
      }

      await comment.deleteOne();

      res.status(200).json({
        message: "Comment deleted successfully"
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
