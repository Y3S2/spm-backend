const db = require("../models");
const Tests = db.tests;


//Retrieve all subbmitted tesrts from the database
exports.findAllSubbmitted = (req, res) => {
    Tests.find({ status: "subbmitted" })
        .then((data) => {
            res.json(data);
            //console.log(data);
        })
        .catch((err) => {
            alert(err);
        });
};