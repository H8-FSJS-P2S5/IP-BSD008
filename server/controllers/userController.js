const { User, Profile } = require("../models");
const { compareHash } = require("../helpers/bcrypt");
const { createToken, signToken } = require("../helpers/jwt");
const { sendEmailRegistration } = require("../api/nodeMailer");
const { OAuth2Client } = require("google-auth-library");
const imagekit = require("../api/imagekit");

class userController {
  //! Register End Point GOOGLE
  static googleAuth = async (req, res, next) => {
    try {
      const { token: googleToken } = req.headers;
      console.log(googleToken);
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      console.log(payload);

      const [user, isNewRecord] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          username: payload.name,
          password: String(Math.random()),
        },
        hooks: false,
      });

      res.status(isNewRecord ? 201 : 200).json({
        access_token: createToken({ id: user.id }),
      });
    } catch (err) {
      next(err);
    }
  };

  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      const newUser = await User.create({
        username,
        email,
        password,
      });

      if (newUser) {
        const successMessage = `Terima kasih ${username} telah mendaftar di Hacktiv Health! Solusi Terbaik Kembalikan Senyum Bahagiamu. Have a Great Day! :)
        `;

        sendEmailRegistration(
          newUser.email,
          "Registrasi Berhasil",
          successMessage
        );

        res.status(201).json({
          message: "Berhasil menambahkan user!",
          newUser: {
            id: newUser.id,
            email: newUser.email,
          },
        });
      } else {
        throw { message: "RegisterError" };
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { message: "LoginError" };
      }
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw { message: "NotFound" };
      }

      const isValidPassword = compareHash(password, user.password);

      if (!isValidPassword) {
        throw { message: "PasswordError" };
      }

      const access_token = signToken({ id: user.id });

      res.status(200).json({
        message: "Berhasil login!",
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  // User Controller
  static async readUser(req, res, next) {
    try {
      const user = await User.findAll({});

      res.status(200).json({
        message: "Berhasil baca data",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async readUserById(req, res, next) {
    try {
      const { userId } = req.user.id;
      const user = await User.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Profile,
            as: "profile",
          },
        ],
      });

      if (!userId) {
        throw { message: "NotFound", id };
      }

      res.status(200).json({
        message: "Berhasil baca data User",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  // Profile Controller
  static async createProfile(req, res, next) {
    try {
      const { fullName, address, phoneNumber } = req.body;

      // Periksa apakah file berhasil diunggah
      if (!req.file) {
        throw { message: "NoFileUploaded" };
      }

      const base64 = req.file.buffer.toString("base64");
      const response = await imagekit.upload({
        file: base64,
        fileName: req.file.originalname,
      });

      const createProfile = await Profile.create({
        fullName,
        photoProfile: response.url, // Simpan URL gambar dari ImageKit ke field photoProfile
        address,
        phoneNumber,
        userId: req.user.id,
      });

      if (createProfile) {
        res.status(201).json({
          message: "Successfully created profile data",
          createProfile,
        });
      } else {
        throw { message: "AddDataError", id };
      }
    } catch (error) {
      next(error);
    }
  }
  static async readProfile(req, res, next) {
    try {
      const profile = await Profile.findAll({});

      res.status(200).json({
        message: "Berhasil baca data",
        profile,
      });
    } catch (error) {
      next(error);
    }
  }
  static async readProfileById(req, res, next) {
    try {
      const { id } = req.params;
      const profile = await Profile.findOne({
        where: {
          id,
        },
      });

      if (!profile) {
        throw { message: "NotFound", id };
      }

      res.status(200).json({
        message: "Berhasil baca data profile",
        profile,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateProfile(req, res, next) {
    try {
      const { id } = req.params;
      const profile = await Profile.findByPk(id);

      if (!profile) {
        throw { message: "NotFound", id };
      }

      const { fullName, photoProfile, address, phoneNumber } = req.body;

      const updatedProfile = await Profile.update(
        {
          fullName,
          photoProfile,
          address,
          phoneNumber,
        },
        {
          where: { id },
        }
      );

      if (updatedProfile[0] === 1) {
        return res.status(201).json({
          message: "Successfully updated profile data",
          profile,
        });
      } else {
        throw { message: "UpdateDataError", id };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = userController;
