const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const corsOptions = {
    origin: "*",
  };
  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//connecting to mongodb atlas database
const db = require("./models/");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  app.get("/", (req, res) => {
    res.json({message: "Welcome to ispirithalei."});
  });

  require("./routes/doctorSession.routes")(app);
require("./routes/doctorNote.routes")(app);
require("./routes/doctorPrescription.routes")(app);

  // set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});