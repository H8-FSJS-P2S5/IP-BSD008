//app.js
const express = require("express");
const passport = require("passport");
const app = express();
const port = 3000;
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const CLIENT_ID_GITHUB = "827517944c04238a7f37";
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bodyParser = require("body-parser");
const CLIENT_SECRET = "749ecbfe0a83b9dae3c2e797641b0ab598b491e6";

// Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get("/GetAccessToken", async (req, res) => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID_GITHUB,
    client_secret: CLIENT_SECRET,
    code: req.query.code,
  });

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token?" + params,
      {
        method: "POST",
        headers: { Accept: "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching access token");
  }
});

app.get("/GetUserData", async (req, res) => {
  try {
    const response = await fetch("https://api.github.com/user", {
      method: "GET",
      headers: { Authorization: req.get("Authorization") },
    });
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching user data");
  }
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const profileRoutes = require("./routes/profileRoutes");

// Use routes
app.use("/auth", authRoutes);

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/profiles", profileRoutes);

app.use(errorHandler);

module.exports = app;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
