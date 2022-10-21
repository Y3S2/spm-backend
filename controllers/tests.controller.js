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

// Create and Save a new Test
exports.create = (req, res) => {
    //console.log(req.body);

    const test = new Tests({
        specimenid: req.body.specimenid,
        subbmitteddate: new Date(),
        starteddate: req.body.starteddate,
        completeddate: req.body.completeddate,
        status: "subbmitted",
        contactnumber: req.body.contactnumber,
        patientsname: req.body.patientsname,
        dateofbirth: req.body.dateofbirth,
        testtype: req.body.testtype,
        collectedperson: req.body.collectedperson,
        inchargelabass: req.body.inchargelabass,
        inchargelabassid: req.body.inchargelabassid,
        specimenproperty: req.body.specimenproperty,
        specimenpropertyresult: req.body.specimenpropertyresult,
    });
    test
        .save(test)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating your session please try again."
            });
        });



};

// Retrieve all patients details in tests from the database.
exports.getAll = (req, res) => {
    Tests.find()
        .then((data) => {
            res.json(data);
            //console.log(data);
        })
        .catch((err) => {
            alert(err);
        });
};

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

//Retrieve all completd tests from the database
exports.findAllCompleted = (req, res) => {
    Tests.find({ status: "completed" })
        .then((data) => {
            res.json(data);
            //console.log(data);
        })
        .catch((err) => {
            alert(err);
        });
};


//Retrieve all started tests from the database
exports.findAllStarted = (req, res) => {
    Tests.find({ status: "started" })
        .then((data) => {
            res.json(data);
            //console.log(data);
        })
        .catch((err) => {
            alert(err);
        });
};

//retrive a single test when specimen id and contact number correct
exports.client = (req, res) => {
    //console.log(req.query)
    const contactnumber = req.query.contactnumber;
    const specimenid = req.query.specimenid;
    //console.log(contactnumber, specimenid)
    Tests.findOne({
        contactnumber: contactnumber,
        specimenid: specimenid
    })
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found test with contact number " + contactnumber });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving test with id=" + id });
        });
}