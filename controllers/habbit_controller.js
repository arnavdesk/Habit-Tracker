const Habbit = require("../models/habbit");

module.exports.load = function (request, response) {
    Habbit.find({}, function (err, habbits) {
        if (err) {
            console.log("Error in fetching habbits from DB");
            return;
        }
        else {
            return response.render('home', { habbit_list: habbits });
        }
    })
}

module.exports.add = function (request, response) {
    request.body.record_tracker = {};
    request.body.user = "Arnav";
    console.log(request.body);
    Habbit.create(request.body, function (err, newHabbit) {
        if (err) {
            console.log("error in creating a habbit");
            return;
        }
        else {
            console.log("******New Habbit******")
            console.log(newHabbit);
            return response.redirect("back");
        }
    })
}

module.exports.delete = function (request, response) {
    let id = request.query.id;
    Habbit.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("error in deletion");
            return;
        }
        else {
            return response.redirect('back');
        }
    })
}

module.exports.viewHabbit = function (request, response) {
    let id = request.query.id;
    Habbit.findById(id, function (err, habbit) {
        if (err) {
            console.log("error in finding habbit");
            return;
        }
        else {
            response.render("habbit.ejs", { "habbit": habbit });
        }
    })
}