const { Router } = require('express');
var express = require('express')
var router = express.Router();

//Controllers
const userController = require("../Controllers/user.controller");

router.get("/:userID",userController.getUser)
router.post("/login",userController.postUserLogin);
router.put("/:userID",userController.updateUser)

module.exports = router;