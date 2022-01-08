const express = require("express");

const errorsController = require("../controllers/errors");

const router = express.Router();

router.get("*", errorsController.get404);

module.exports = router;
