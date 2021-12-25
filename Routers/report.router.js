const { Router } = require('express');
var express = require('express')
var router = express.Router();

//Controllers
const reportController = require("../Controllers/report.controller");


router.post("/",reportController.postReport);
router.post("/:reportID/pdf",reportController.reportPDF);
router.post("/:reportID/email",reportController.reportEmail);
router.get("/all",reportController.getAllReports);
router.get("/:reportID",reportController.getReport)
router.get("/",reportController.getReports);
router.put("/:reportID",reportController.updateReport)

module.exports = router;