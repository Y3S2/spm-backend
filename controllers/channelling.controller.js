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

// Retrieve all appoitnemnts
exports.findAll = (req, res) => {
    Channell.find().populate('dSession')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send("Some error occurred while retrieving chanelling.");
        });
};

// Retrieve all appoitnemnts by search query
exports.searchByQuery = (req, res) => {
    const query = req.params.query;
    const wantedStatus = req.params.status;
    const mongoQuery = wantedStatus != "All" ?
        {
            status: wantedStatus,
            $or: [{nic: {'$regex': query, '$options': 'i'}}, {fullname: {'$regex': query, '$options': 'i'}}]
        }
        : {$or: [{nic: {'$regex': query, '$options': 'i'}}, {fullname: {'$regex': query, '$options': 'i'}}]}
    Channell.find(mongoQuery).populate('dSession')
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send("Some error occurred while retrieving chanelling.");
        });
};

// Retrieve all appoitnemnts by appointment status (Pending/CheckedIn)
exports.findAllByStatus = (req, res) => {
    const wantedStatus = req.params.status
    Channell.find({status: wantedStatus}).populate('dSession')
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

//Get the Number of documents in the database
var getCount = async function (req, res) {
    var pendingCount = await Channell.countDocuments({status: 'Pending'});
    var checkedinCount = await Channell.countDocuments({status: 'CheckedIn'});
    var allCount = await Channell.estimatedDocumentCount();

    const weekData = await Channell.aggregate([
        {
            "$lookup": {
                "from": "sessions",
                "localField": "dSession",
                "foreignField": "_id",
                "as": "session"
            }
        },
        {
            "$project": {
                "_id:": 1,
                "session.date": {
                    "$dayOfWeek": {
                        $dateFromString: {
                            dateString: {$arrayElemAt: ["$session.date", 0]}
                        }
                    }
                },

            }
        },

        {
            "$group": {
                "_id": {$arrayElemAt: ["$session.date", 0]},
                "count": {$sum: 1},
            },
        },
    ])

    var hasResult = []
    for (var week of weekData) {
        hasResult.push(week._id)
    }

    for (var i = 1; i <= 7; i++) {
        if (!hasResult.includes(i)) {
            weekData.push({_id: i, count: 0})
        }
    }
    weekData.sort(function (a, b) {
        return a._id - b._id;
    });
    weekData[0]._id = "Mon"
    weekData[1]._id = "Tue"
    weekData[2]._id = "Wed"
    weekData[3]._id = "Thu"
    weekData[4]._id = "Fri"
    weekData[5]._id = "Sat"
    weekData[6]._id = "Sun"

    const count = {
        all: {
            text: "All Appointments",
            path: "/staff/receptionist/allappointments",
            number: allCount,
        },
        pending: {
            text: "Pending",
            path: "/staff/receptionist/pendingappointments",
            number: pendingCount,
        },
        checkedin: {
            text: "Checked-In",
            path: "/staff/receptionist/checkedinappointments",
            number: checkedinCount,
        }
    }

    const sendData = {
        count: {...count},
        week: {weekData},
    }
    res.send(sendData);
}
;
exports.getCount = getCount;

// Update a channelling by the id and status in the request
exports.updateStatus = (req, res) => {
    const ID = req.params.id.toString();
    const newStatus = req.params.status.toString();
    Channell.updateOne(
        {_id: ID},
        {status: newStatus},
    )
        .then(response => {
            if (response.nModified > 0)
                res.status(200).send("Successfully Updated")
            else
                res.status(400).send("0 rows updated");
        })
        .catch(err => {
            res.send("Error update");
        });
};

// Delete a channelling with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all channells from the database.
exports.deleteAll = (req, res) => {

};