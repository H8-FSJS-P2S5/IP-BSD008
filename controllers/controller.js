const { compareHash, signToken } = require("../helpers");
const { User, Category, Post } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        province,
        city,
        email,
        password,
        CategoryId,
      } = req.body;

      let data = await User.create({
        firstName,
        lastName,
        phoneNumber,
        province,
        city,
        email,
        password,
        CategoryId,
      });
      res.status(201).json({ msg: "berhasil register" });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      if (!email || !password) {
        throw new Error("Please input email/password");
      }

      let data = await User.findOne({
        where: {
          email,
        },
      });

      if (!data) {
        throw new Error("Not Found");
      }

      const isValid = compareHash(password, data.password);

      if (!isValid) {
        throw new Error("Invalid email/password");
      }

      const payload = {
        id: data.id,
        firstName: data.firstName,
        email: data.email,
        CategoryId: data.CategoryId,
      };
      const token = signToken(payload);

      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      let data = await User.findAll({
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      res.status(200).json({
        data,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const {
        firstName,
        lastName,
        phoneNumber,
        province,
        city,
        email,
        password,
        CategoryId,
      } = req.body;

      let data = await User.update(
        {
          firstName,
          lastName,
          phoneNumber,
          province,
          city,
          email,
          password,
          CategoryId,
        },
        {
          where: {
            id,
          },
        }
      );

      let output = await User.findByPk(id);
      console.log(output, 117);
      res.status(200).json({
        msg: `dah di update`,
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async categories(req, res, next) {
    try {
      let data = await Category.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password", "updatedAt", "createdAt"],
          },
        },
      });
      res.status(200).json({ data });
    } catch (error) {
      next(error);
    }
  }

  static async categoryById(req, res, next) {
    try {
      const { id } = req.params;
      let data = await Category.findByPk(id);

      if (!data) {
        throw new Error("Error Not Found");
      }

      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addCategories(req, res, next) {
    try {
      const { name } = req.body;
      let data = await Category.create({
        name,
        code,
        description,
      });

      if (!data) {
        throw new Error("Validation Errors");
      }

      res.status(201).json({
        msg: `berhasil create category`,
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUserById(req, res, next) {
    try {
      const { id } = req.params;
      let data = await User.findByPk(id);

      if (!data) {
        throw new Error("Error Not Found");
      }

      await User.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        msg: `${data.name} success to delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addPost(req, res, next) {
    try {
      const { history } = req.body;

      const data = await Post.create({
        history,
        UserId: req.loginInfo.id,
      });

      console.log(data);
      res.status(201).json({ msg: "berhasil add post", data });
    } catch (error) {
      console.log(error);
    }
  }

  static async getPosts(req, res, next) {
    try {
      const data = await Post.findAll({
        include: {
          model: User,
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"],
          },
        },
      });
      res.status(200).json({
        data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
