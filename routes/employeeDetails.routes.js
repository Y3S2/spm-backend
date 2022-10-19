module.exports = (app) => {
  const empform = require("../controllers/employeeDetails.controller");

  let router = require("express").Router();

  // Create a new empform
  router.post("/", empform.create);

  // Retrieve all empform data with given Emp ID
  router.get("emp/:id", empform.findAllByEmpID);


  app.use("/api/empform", router); //this is the base url
};
