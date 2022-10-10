module.exports = app => {
    const sessions = require("../controllers/doctorSession.controller");

    let router = require("express").Router();

    // Create a new Session
    router.post("/", sessions.create);

    // Retrieve all Sessions with given Doctor ID
    router.get("/:id", sessions.findAllByDoctorID);

    // // Update a Session with id
    // router.put("/:id", sessions.update);

    // Increase current appointments by one
    router.put("/increment/:id", sessions.increaseCurrentAppointments);
    
    // Delete a Session with id
    router.delete("/:id", sessions.delete);

    // // Delete all Sessions
    // router.delete("/", sessions.deleteAll);

    app.use('/api/sessions', router);
};