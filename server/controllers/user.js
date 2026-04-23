const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { reverseGeocode } = require("../service/geocode");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async addUser(req, res, next) {
    try {
      const { name, email, password, salary, location } = req.body;
      const { lat, lon } = location;
      if (!lat || !lon) {
        throw { name: "BadRequest", message: "Location required" };
      }
      const city = await reverseGeocode(lat, lon);
      const data = await User.create({
        name,
        email,
        password,
        salary,
        location: city,
        latitude: lat,
        longitude: lon,
      });
      const result = data.toJSON();
      delete result.password;
      res.status(201).json(result);
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "BadRequest", message: "email is required" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "password is required" };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const checkPassword = comparePassword(password, user.password);

      if (!checkPassword) {
        throw { name: "Unauthorized", message: "Invalid email/password" };
      }

      const access_token = signToken({
        id: user.id,
        email: user.email,
      });

      res.status(200).json({ access_token: access_token });
    } catch (error) {
      next(error);
    }
  }
  static async getProfile(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client();
      const { access_token_google } = req.headers;

      if (!access_token_google)
        throw { name: "BadRequest", message: "Invalid Token" };

      const ticket = await client.verifyIdToken({
        idToken: access_token_google,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload.email_verified) {
        throw { name: "BadRequest", message: "Email not verified" };
      }

      const { lat, lon } = req.body.location;
      if (lat && lon) {
        payload.location = await reverseGeocode(lat, lon);
      }

      const [user] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          password: Date.now().toString() + Math.random().toString(),
          name: payload.name || payload.email.split("@")[0],
          location: payload.location || "Unknown",
          salary: 0,
          latitude: lat || null,
          longitude: lon || null,
        },
      });

      const access_tokens = signToken({
        id: user.id,
        email: user.email,
      });
      res.status(200).json({ access_token: access_tokens });
    } catch (error) {
      next(error);
    }
  }
  static async updateSalary(req, res, next) {
    try {
      const { salary } = req.body;
      if (!salary || isNaN(salary) || parseInt(salary) <= 0) {
        throw {
          name: "BadRequest",
          message: "Salary must be a positive number",
        };
      }
      const user = await User.findByPk(req.user.id);
      if (!user) {
        throw { name: "NotFound", message: "User not found" };
      }
      user.salary = salary;
      await user.save();
      const result = user.toJSON();
      delete result.password;
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
