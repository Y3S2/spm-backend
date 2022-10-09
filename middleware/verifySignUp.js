const db = require("../models");
const Password = db.employees;


checkDuplicateEmail = (req, res, next) => {
    // Email
    Password.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
};

checkPassword = (req, res, next) => {
  // Password
  Password.findOne({
    password: req.body.password
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Password invalid!" });
      return;
    }

    next();
  });
};



const verifySignUp = {
    checkDuplicateEmail,
    checkPassword
};

module.exports = verifySignUp;