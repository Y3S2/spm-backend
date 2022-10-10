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

}