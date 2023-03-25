const express = require("express");
const { UserModel } = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { email, password, location, age } = req.body;
  try {
    bcrypt.hash(password, 2, async (err, hash) => {
      const user = new UserModel({ email, password: hash, location, age });
      await user.save();
      res.status(200).send({ msg: "Registration Successful" });
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res
            .status(200)
            .send({
              msg: "Login Successful",
              token: jwt.sign({ userID: user._id }, "masai"),
            });
        } else {
          res.status(400).send({ error: err });
        }
      });
    } else {
      res.status(400).send({ error: err.message });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  userRouter,
};
