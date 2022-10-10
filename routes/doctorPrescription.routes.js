module.exports = app => {
    const prescriptions = require("../controllers/doctorPrescription.controller");

    let router = require("express").Router();

    // Create a new Prescription
    router.post("/", prescriptions.create);

    //read all prescriptions of a given doctor ID
    router.get("/:id", prescriptions.findAll);

    //update the prescription of given patient name
    router.put("/:id", prescriptions.update);

    //delete a prescription of given id
    router.delete("/:id", prescriptions.delete);

    // Retrieve a single Prescription with id
    router.get("/edit/:id", prescriptions.findOne);

    // Retrieve all prescriptions
    router.get("/",prescriptions.getAll);

    // Retrieve all prescriptions by searched name
    router.get("/search/:name/:id", prescriptions.searchByName);

    app.use('/api/prescriptions', router);
};