const express = require("express");
const User = require("../models/User");
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    try {
      const users = await User.find().select("-password");

      res.status(200).json({
        message: "All users fetched successfully",
        users
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.put(
  "/:id/role",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    try {
      const { role } = req.body;

      if (!["Admin", "Author", "Reader"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "User role updated successfully",
        user
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

router.get(
  "/admin/all-blogs",
  authMiddleware,
  roleMiddleware("Admin"),
  async (req, res) => {
    try {
      const blogs = await Blog.find()
        .populate("author", "name email role")
        .sort({ createdAt: -1 });

      res.status(200).json({
        message: "All blogs fetched successfully",
        blogs
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

module.exports = router;
