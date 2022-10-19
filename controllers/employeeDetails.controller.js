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

// Retrieve all Employee details with matching emp ID from the database.
exports.findAllByEmpID = (req, res) => {
  const empID = req.params.id;
  EmpDetails.find({ emp_id: empID })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving sessions.",
      });
    });
};

// Delete a form with the specified id in the request
exports.delete = async (req, res) => {
  let Id = req.params.id;
  await EmpDetails.findOneAndDelete({ _id: Id })
    .then(() => {
      res.status(200).send({ status: "user deleted" });
    })
    .catch((e) => {
      console.log(e);
      res.status(400).send({ status: "error in delete operation" });
    });
};

// Retrieve all emp details from the database.
exports.getAll = (req, res) => {
  EmpDetails.find()
    .then((data) => {
      res.json(data);

    })
    .catch((err) => {
      alert(err);
    });
};
