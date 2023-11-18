// controllers/commentController.js
const { Comment, User, Post } = require("../models");

const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "email"],
        },
        {
          model: Post,
          attributes: ["id", "content", "timestamp"],
        },
      ],
    });
    res.status(200).json(comments);
  } catch (err) {
    next(err);
  }
};

const getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findByPk(req.params.id, {
      include: [User, Post],
    });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

const createComment = async (req, res, next) => {
  try {
    // Ensure that the 'id' and 'content' are retrieved from the request body
    const { id, content } = req.body;
    console.log(req.body);
    // Check if 'id' and 'content' are defined in the request body
    if (id === undefined || content === undefined) {
      return res
        .status(400)
        .json({ error: "Missing id or content in the request" });
    }

    console.log("Received id:", id);
    console.log("Received content:", content);

    // Create the comment with userId from the authenticated user
    const commentData = {
      userId: req.user.id, // Assuming userId is used to associate comments with users
      id,
      content,
    };
    console.log("Creating comment with data:", commentData);

    const comment = await Comment.create(commentData);
    console.log("Created comment:", comment);
    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

const getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { postId: req.params.postId },
      include: [User, Post],
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const comment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(comment);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getComments,
  getCommentById,
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
};
