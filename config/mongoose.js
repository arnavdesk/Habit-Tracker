// library required
const mongoose = require("mongoose");

// connect to database
mongoose.connect("mongodb://localhost/habbits", { useNewUrlParser: true });

// get db instance
const db = mongoose.connection;

// handle error
db.on("error", console.error.bind(console, `error connecting to db`));

// if it gets connected
db.once("open", function () {
    console.log(`Connection to database successful : MongoDB`)
})