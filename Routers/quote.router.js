const { Router } = require('express');
var express = require('express')
var router = express.Router();

//Controllers
const quoteController = require("../Controllers/quote.controller");


router.post("/",quoteController.postQuote);


module.exports = router;