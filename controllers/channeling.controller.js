const db = require("../models");
const Channell = db.channell;
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

// Create and Save a new channelling

exports.create = (req, res) => {

    //sending echanelling details via an email
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "ispirithale@outlook.com",
            pass: "@waCamDa!69",
        },
    });

    const options = {
        from: "ispirithale@outlook.com",
        to: req.body.email,
        subject: "Echanelling Confrimation {ISPIRITHALEI}",
        text: "Entered Fullname: " + req.body.fullname + "\nEntered NIC: " + req.body.nic + "\nEntered Mobile :" + req.body.mobile + "\nEntered Age:" + req.body.age,
    };

    transporter.sendMail(options, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
    });

    const channell = new Channell({
        dSession: mongoose.Types.ObjectId(req.body.session),
        fullname: req.body.fullname,
        nic: req.body.nic,
        email: req.body.email,
        mobile: req.body.mobile,
        age: req.body.age,
        status: "Pending",

    });
    channell
        .save(channell)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message: err.message || "Some error occured while creating your channelling please try again."
            });
        });


};

// Retrieve all appoitnemnts with id
exports.findAllByChannellID = (req, res) => {
    const channellID = req.params.id;
    Channell.find({chanell_id: channellID})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving chanelling."
            });
        });
};

