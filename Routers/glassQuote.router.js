const { Router } = require('express');
var express = require('express')
var router = express.Router();

//Controllers
const glassQuoteController = require("../Controllers/glassQuote.controller");


router.post("/",glassQuoteController.postGlassQuote);


module.exports = router;