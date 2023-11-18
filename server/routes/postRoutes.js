// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const {
  getPosts,
  getPostById,
  createPost,
} = require("../controllers/postController");
const likeController = require("../controllers/likeController");
const authenticate = require("../middleware/authenticate");

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.post("/:postId/like", authenticate, likeController.toggleLike);

module.exports = router;
