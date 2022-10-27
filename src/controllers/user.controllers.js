const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  err400,
  success201,
  success200,
  err404,
} = require("../helpers/messages");
const {
  insertUser,
  getAll,
  removeBy,
  updateBy,
  findBy,
} = require("../models/user.models");
dotenv.config();

module.exports = {
  signUp: async (req, res) => {
    try {
      await insertUser(req.body);
      return res.status(201).json(success201());
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const resp = await getAll();
      return res.status(200).json(success200(resp));
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },
  signIn: async (req, res) => {
    try {
      const { username, email, role } = req.body;
      const payload = { username: username, email: email, role: role };
      const options = {
        expiresIn: "1d",
      };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        options
      );
      return res.status(200).json({
        code: 200,
        status: "OK",
        token_type: "Bearer",
        accessToken: accessToken,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      await updateBy({ _id: id }, req.body);
      const resp = await findBy({ _id: id });
      const show = {
        _id: resp._id,
        username: resp.username,
        email: resp.email,
        role: resp.role,
      };
      return res.status(200).json(success200(show));
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error.codeName));
    }
  },
  removeUser: async (req, res) => {
    try {
      const { id } = req.params;
      const resp = await removeBy({ _id: id });
      if (!resp) return res.status(404).json(err404());
      return res.status(200).json(success200());
    } catch (error) {
      console.log(error);
      return res.status(400).json(err400(error));
    }
  },
};
