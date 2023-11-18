const express = require("express");
const router = express.Router();
const {
  getProfiles,
  getProfileById,
  createProfile,
  updateProfile,
} = require("../controllers/profileController");
const upload = require("multer")({ dest: "uploads/" });

router.get("/", getProfiles);
router.get("/:id", getProfileById);
router.post("/", upload.single("profile_picture"), createProfile);
router.put("/:id", updateProfile);

module.exports = router;
