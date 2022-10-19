module.exports = (app) => {
  const empform = require("../controllers/employeeDetails.controller");

  let router = require("express").Router();

  // Create a new empform

  app.use("/api/empform", router); //this is the base url
};
