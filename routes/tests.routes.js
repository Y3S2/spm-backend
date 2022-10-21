module.exports = app => {
    const tests = require("../controllers/tests.controller");

    let router = require("express").Router();


    // Retrieve all subbmitted tests
    router.get("/subbmitted", tests.findAllSubbmitted);

    // Retrieve all compleetd tests
    router.get("/completed", tests.findAllCompleted);

    // Retrieve all started tests
    router.get("/started", tests.findAllStarted);

    // Create a new tests
    router.post("/", tests.create);

    //geta all test details
    router.get("/", tests.getAll);

    //retrive a single test when specimen id and contact number correct
    router.get("/client", tests.client);

    //retrive a single test when specimen id and contact number correct
    router.get("/stats", tests.getstat);

    //Update a test with id
    router.put("/:id", tests.update);

    // Delete a test with id
    router.delete("/:id", tests.delete);

    // Retrieve a single test with id
    router.get("/:id", tests.findOne);

    app.use('/api/tests', router);

};