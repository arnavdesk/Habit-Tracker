const express = require("express");
const app = express();

//Port is 8000
const port = 8000;


// Import model for using it further
const Task = require("./models/habbit");

// Require DB connection
const db = require("./config/mongoose");

// Static files
app.use(express.static("./assets"));


// read request
app.use(express.urlencoded());


// routing
app.use("/", require("./routes"));


// set up ejs
app.set("view engine", "ejs");
app.set("views", "./views");



// Start listening to the express server
app.listen(port, function (err) {
    if (err) {
        console.log(`Error :: ${err}`);
    }
    else {
        console.log(`Server running on port :: ${port}`);
    }
});