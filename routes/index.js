const express = require("express");
const router = express.Router();

const habbitController = require("../controllers/habbit_controller");


router.get("/", habbitController.load);

router.post("/add-habbit", habbitController.add);

router.get("/delete-habbit", habbitController.delete);

router.get("/view-habbit", habbitController.viewHabbit);

router.get("/find-habbit", habbitController.fetchHabbit);

router.get("/update-db-date", habbitController.updateDates);

module.exports = router;