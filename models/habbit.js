const mongoose = require("mongoose");

const habbitSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    habbit_name: {
        type: String,
        required: true
    },
    record_tracker: {
        type: Map,
    }
})

const Habbit = mongoose.model("Habbit", habbitSchema);

module.exports = Habbit;