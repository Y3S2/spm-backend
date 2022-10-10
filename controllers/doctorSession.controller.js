const db = require("../models");
const Session = db.sessions;

// Create and Save a new Session

exports.create = (req, res) => {
    const session = new Session({
        doctor_id: req.body.doctorID,
        date: req.body.sessionDate,
        time: req.body.sessionTime,
        maxAppointments: req.body.maxAppointments,
        currentAppointments: 0
    });
    session
        .save(session)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate session
                return res.status(422).send({ succes: false, message: 'Session already exist!' });
            }

            // Some other error
            return res.status(500).send(err);
        });


};

// Retrieve all Sessions with matching doctor ID from the database.
exports.findAllByDoctorID = (req, res) => {
    const doctorID = req.params.id;
    Session.find({doctor_id: doctorID}).sort( { date: -1 } )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sessions."
            });
        });
};

// Increase Current Appointments of a Session by the id in the request
exports.increaseCurrentAppointments = (req, res) => {
    const ID = req.params.id.toString();
    Session.updateOne(
        {_id: ID, $expr: {$gt: ["$maxAppointments", "$currentAppointments"]}},
        {$inc: {"currentAppointments": 1}},
    )
        .then(response => {
            if (response.modifiedCount > 0 || response.nModified > 0)
                res.status(200).send("Successfully Updated")
            else
                res.status(400).send("Update Failed. Maximum Appointments Reached");

        })
        .catch(err => {
            res.send("Error update");
        });
};

// Delete a Session with the specified id in the request
exports.delete = (req, res) => {
    const ID = req.params.id;
    Session.deleteOne({_id: ID})
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occured couldn't delete item."
            });
        });
};

// // Delete all Sessions from the database.
// exports.deleteAll = (req, res) => {
//
// };

// exports.findByDoctorName = (req,res) => {
//
// };