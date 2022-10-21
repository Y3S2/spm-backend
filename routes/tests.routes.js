module.exports = app => {
    const tests = require("../controllers/tests.controller");

    let router = require("express").Router();

    // Retrieve all subbmitted tests
    router.get("/subbmitted", tests.findAllSubbmitted);

    // Create a new tests
    router.post("/", tests.create);

    // Retrieve all compleetd tests
    router.get("/completed", tests.findAllCompleted);

    // Retrieve all started tests
    router.get("/started", tests.findAllStarted);

    // Create a new tests
    router.post("/", tests.create);

    //geta all test details
    router.get("/", tests.getAll);
};