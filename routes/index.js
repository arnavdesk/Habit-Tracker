const express = require("express");
const router = express.Router();

const habbitController = require("../controllers/habbit_controller");


router.get("/", habbitController.load);

router.post("/add-habbit", habbitController.add);

router.get("/delete-habbit", habbitController.delete);

router.get("/view-habbit", habbitController.viewHabbit);

module.exports = router;