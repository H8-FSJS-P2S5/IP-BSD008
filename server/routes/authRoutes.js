const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { updateProfile } = require("../controllers/profileController");
const AuthController = require("../controllers/authGoogleController");

// GitHub Authentication
// router.get("/github", authController.githubAuth);
// router.get("/github/callback", authController.githubAuthCallback);

// Register & Login
router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/profile/update/:userId", updateProfile);
//google login
router.post("/google-login", AuthController.googleLogin);

// router.get("/session", (req, res) => {
//   // Assuming you have a method to check if the user is authenticated
//   if (req.isAuthenticated()) {
//     res.json({ user: req.user });
//   } else {
//     res.status(401).json({ message: "Not authenticated" });
//   }
// });

// Session Check
// router.get("/session", authController.checkSession);

module.exports = router;
