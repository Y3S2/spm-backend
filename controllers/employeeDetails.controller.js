const db = require("../models");
const EmpDetails = db.employees;
const nodemailer = require("nodemailer");

// Create and Save a new empform

exports.create = (req, res) => {

  // sending user credentials via email
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "ispirithalei@outlook.com",
      pass: "@waCamDa!69",
    },
  });

  const options = {
    from: "ispirithalei@outlook.com",
    to: req.body.email,
    subject: "Login Credentials",
    text: "Username: " + req.body.email + "\nPassword: " + req.body.password,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
  });

  //validate request
  if (req.body) {
    res.status(400).send({ message: "content can not be empty" });
  }

  const empform = new EmpDetails({
    role: req.body.role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    mobile: req.body.mobile,
    address: req.body.address,
    password: req.body.password,
  });

  empform
    .save(empform)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occured while creating your session please try again.",
      });
    });
};


//retrive a single employee detail
exports.findOne = (req, res) => {
  const id = req.params.id;

  EmpDetails.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found test with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving test with id=" + id });
    });
};
