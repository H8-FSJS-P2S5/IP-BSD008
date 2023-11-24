const express = require("express");
const Controller = require("../controllers/controller");
const router = express.Router();

router.get("/", Controller.getUser);
router.put("/:id", Controller.updateUser);
router.delete("/:id", Controller.deleteUserById);

module.exports = router;
