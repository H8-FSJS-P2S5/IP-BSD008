const { Post, Comment, Like, Media } = require("../models");

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: Comment, attributes: ["id", "content", "timestamp"] },
        { model: Like, attributes: ["id"] },
        { model: Media, attributes: ["id", "file_path", "media_type"] },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [Comment, Like, Media],
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const createPost = async (req, res, next) => {
  // Add authentication check here
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = { getPosts, getPostById, createPost };
