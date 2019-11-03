const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  create: function(req, res, next) {
    userModel.create(
      {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
      },
      function(err, result) {
        if (err) next(err);
        else
          res.json({
            status: "success",
            message: "User added successfully!!!",
            data: null
          });
      }
    );
  },
  generate: function(req, res, next) {
    userModel.create(
      {
        name: req.body.name,
        date: req.body.date,
        test: req.body.test
      },
      function(err, result) {
        if (err) next(err);
        else
          token = jwt.sign({ id: result._id }, req.app.get("secretKey"), {
            expiresIn: "1d"
          });
        content = {};
        content.token = token;
        content.link = `code.zessta.com?${result._id}`;
        content.id = result._id;
        res.json({
          status: "success",
          message: "Link successfully generated",
          data: { content }
        });
      }
    );
  },
  authenticate: function(req, res, next) {
    userModel.findOne({ email: req.body.email }, function(err, userInfo) {
      if (err) {
        next(err);
      } else {
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
          const token = jwt.sign(
            { id: userInfo._id },
            req.app.get("secretKey"),
            { expiresIn: "1h" }
          );
          res.json({
            status: "success",
            message: "user found!!!",
            data: { user: userInfo, token: token }
          });
        } else {
          res.json({
            status: "error",
            message: "Invalid email/password!!!",
            data: null
          });
        }
      }
    });
  }
};
