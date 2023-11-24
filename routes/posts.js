const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.post("/", Controller.addPost);
router.get("/", Controller.getPosts);

module.exports = router;
