"use strict";

const { User } = require("../models");
const { Op } = require("sequelize");
const token = require("../helper/token");
const { check_password } = require("../helper/bcrypt");

class UserController {
  static async create(req, res, next) {
    try {
      const { username, full_name, email, password, phone_number } = req.body;

      if (!username || !full_name || !email || !password || !phone_number) {
        next({
          name: "Database error",
          message: "Please input all the field",
        });
      }

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { username: username },
            { full_name: full_name },
            { email: email },
          ],
        },
      });

      if (existingUser) {
        next({
          name: "Database error",
          message:
            "User with the same username, full name, or email already exists",
        });
      }

      const newUser = await User.create({
        username,
        full_name,
        email,
        password,
        phone_number,
      });

      const user_token = token.generate_token(newUser);
      res.status(201).json({
        message: "Success Register",
        access_token: user_token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      next({
        name: "Database error",
        message: "Please input all the field",
      });
    }

    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      next({
        name: "Not Found",
        message: "email or password is wrong",
      });
    } else {
      if (check_password(req.body.password, user.password)) {
        const userToken = token.generate_token(user);
        res.status(201).json({
          message: "Success Login",
          access_token: userToken,
          user: user,
        });
      } else {
        next({
          name: "Not Found",
          message: "email or password is wrong",
        });
      }
    }
  }
}

module.exports = UserController;
