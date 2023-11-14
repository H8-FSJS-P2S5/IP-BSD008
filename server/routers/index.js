const router = require("express").Router();
const Controller = require("../controllers/Controller");
const Auth = require("../middlewares/auth");

const recipes = require("./recipes");

router.post("/login", Controller.googleLogin);
// router.post("/login", Controller.login);

// router.use(Auth.authenticate);

router.use("/recipes", recipes);

module.exports = router;
