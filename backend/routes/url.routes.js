var express = require("express");
var router = express.Router();

/*
    These are the routes to the servises requested by the client.

*/
//We import the controllers required, in this example we just have the one
var urlController = require("../controllers/url.controller");
var validate = require("../middleware/validate")
//Restfull requests, feture Post,get,Delete,Put,
//These corispond with CRUD operations for the database

//POST OR CREATE
router.post("/shorten/" ,urlController.add);
//GET OR READ
router.get("/:url", urlController.find);

module.exports = router;
