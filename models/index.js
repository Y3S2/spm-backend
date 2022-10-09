const dbConfig = require("../config/db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.sessions = require("./doctorSession.model")(mongoose);
db.notes = require("./doctorNote.model")(mongoose);
db.prescriptions = require("./doctorPrescription.model")(mongoose);
db.creditCardPayments = require("./creditCardDetails.model")(mongoose);
db.inventory = require("./inventory.model")(mongoose);
db.employees = require("./employeeDetails.model")(mongoose);
db.tests = require("./tests.model.js")(mongoose);
db.channell = require("./echannelling.model")(mongoose);
db.inquiry = require("./postInquiry.model")(mongoose);
db.mobilepayments = require("./mobilePayments.model")(mongoose);
db.refunds=require("./refunds.model")(mongoose);
db.mdrequest = require("./purchaseRequest.model")(mongoose);
module.exports = db;