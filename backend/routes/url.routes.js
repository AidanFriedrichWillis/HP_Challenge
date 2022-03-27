var express = require("express");
var router = express.Router();


var urlController = require("../controllers/url.controller");


router.post("/shorten/",urlController.add);
router.get("/:url",urlController.find);

module.exports = router;