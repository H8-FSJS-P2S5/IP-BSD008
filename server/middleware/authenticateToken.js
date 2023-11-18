// Example middleware for token validation (Node.js/Express)
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "token", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
