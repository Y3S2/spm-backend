module.exports = app => {
    const channell = require("../controllers/echannelling.controller")

    let router = require("express").Router();

    // Create a new channelling
    router.post("/add", channell.create);
     
    // Retrieve all channelling with given chanell ID
    router.get("/byID/:id", channell.findAllByChannellID);

    // Retrieve all channelling with given appointment status
    router.get("/bystatus/:status", channell.findAllByStatus);

    // Retrieve all channelling appointments
    router.get("/all/", channell.findAll);
    
    // Retrieve all channelling appointments by search query
    router.get("/search/:query/:status", channell.searchByQuery);

    // Retrieve all channelling with given chanell ID
    router.get("/count/", channell.getCount);
    
    // Update a Session with id
    router.put("/status/:id/:status", channell.updateStatus);

    // Delete a Session with id
    router.delete("/:id", channell.delete);

    // Delete all Sessions
    router.delete("/", channell.deleteAll);

    

   

    app.use('/api/channell', router);
};