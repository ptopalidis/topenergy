const { Router } = require('express');
var express = require('express')
var router = express.Router();

const scriptController = require("../Controllers/script.controller");

router.post("/insertGlasses",scriptController.insertGlassesFromCsv)
router.post("/countGlasses",scriptController.countGlasses)


module.exports = router;