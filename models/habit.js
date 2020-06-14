const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    habit_name: {
        type: String,
        required: true
    },
    record_tracker: {
        type: Map,
    }
})

const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;