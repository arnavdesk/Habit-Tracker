const Habit = require("../models/habit");

module.exports.load = function (request, response) {
    Habit.find({}, function (err, habits) {
        if (err) {
            console.log("Error in fetching habits from DB");
            return;
        }
        else {
            return response.render('home', { habit_list: habits });
        }
    })
}

module.exports.add = function (request, response) {
    request.body.record_tracker = {};
    request.body.user = "Arnav";
    console.log(request.body);
    Habit.create(request.body, function (err, newhabit) {
        if (err) {
            console.log("error in creating a habit");
            return;
        }
        else {
            console.log("******New habit******")
            console.log(newhabit);
            return response.redirect("back");
        }
    })
}

module.exports.delete = function (request, response) {
    let id = request.query.id;
    Habit.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("error in deletion");
            return;
        }
        else {
            return response.redirect('back');
        }
    })
}

module.exports.viewhabit = function (request, response) {
    let id = request.query.id;
    Habit.findById(id, function (err, habit) {
        if (err) {
            console.log("error in finding habit");
            return;
        }
        else {
            response.render("habit.ejs", { "habit": habit });
        }
    })
}

module.exports.fetchhabit = function (request, response) {
    let id = request.query.id;
    Habit.findById(id, function (err, habit) {
        if (err) {
            console.log("error in finding habit");
            return;
        }
        else {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(habit));
        }
    })
}


module.exports.updateDates = function (request, response) {
    let id = request.query.id;
    let date = request.query.date;
    let value = request.query.value;
    console.log(date, value, id);

    Habit.findById(id, function (err, habit) {
        if (err) {
            console.log("Error in updating habit!!!!");
            return response.end('{ "status":"failed"}');
        }
        else {
            const r_t = habit.record_tracker;
            if (date in r_t) {
                r_t[date] = value;
            }
            else {
                r_t.set(date, value);
            }
            console.log(r_t);
            Habit.updateOne({ "_id": id }, { $set: { record_tracker: r_t } }, function (err) {
                if (err) {
                    console.log("Error in updating habit!!!!");
                    return response.end('{ "status":"failed"}');
                }
                else {
                    console.log("Updated!");
                    return response.end('{ "status":"success"}');
                }
            });
        }
    });


}