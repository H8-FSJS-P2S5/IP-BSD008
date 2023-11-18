const { User } = require("../models");
const { createToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

class AuthController {
  static async googleLogin(req, res, next) {
    try {
      const token = req.headers.authorization.split(" ")[1]; // Extract the token from the Authorization header.
      const client = new OAuth2Client();
      console.log(token, "<<<<<<<");

      async function verify(token) {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience:
            "616851447665-fhujr9mld5ds3ehkdoo6stdeufnnms6p.apps.googleusercontent.com",
        });
        const payload = ticket.getPayload();
        const [user, created] = await User.findOrCreate({
          where: {
            email: payload.email,
          },
          defaults: {
            email: payload.email,
            password: "password_google",
          },
          hooks: false,
        });
        console.log(user, "<<<<<<<");
        const access_token = createToken({
          id: user.id,
          email: user.email,
        });
        res.status(200).json({ access_token });
      }
      verify(token).catch(console.error);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = AuthController;
