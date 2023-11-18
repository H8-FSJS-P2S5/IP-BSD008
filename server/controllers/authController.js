const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
// const passport = require("../auth/githubStrategy");

// exports.checkSession = (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json({ user: req.user });
//     console.log(req.isAuthenticated, "<<<<<");
//   } else {
//     res.status(401).json({ message: "Not authenticated" });
//   }
// };

exports.register = async (req, res, next) => {
  try {
    const { email, password, ...otherData } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }
    2;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      ...otherData,
    });

    const { password: _, ...userData } = user.get({ plain: true });
    res.status(201).json(userData);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, "your_secret_key", {
      expiresIn: "1h",
    });
    console.log(token);

    res.json({
      message: "Logged in successfully!",
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err) {
    next(err);
  }
};

function createToken(userId) {
  return jwt.sign({ id: userId }, "your_secret_key", { expiresIn: "1h" });
}
