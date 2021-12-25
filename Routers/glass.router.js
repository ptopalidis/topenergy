const { Router } = require('express');
var express = require('express')
var router = express.Router();

//Controllers
const glassControllers = require("../Controllers/glass.controller");

router.get("/all",glassControllers.getAllGlasses)
router.get("/",glassControllers.getGlasses);
router.post("/",glassControllers.postGlass);


module.exports = router;