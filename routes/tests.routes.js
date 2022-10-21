module.exports = app => {
    const tests = require("../controllers/tests.controller");

    let router = require("express").Router();

    // Retrieve all subbmitted tests
    router.get("/subbmitted", tests.findAllSubbmitted);


};