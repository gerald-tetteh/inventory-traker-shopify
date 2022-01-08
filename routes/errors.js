/**
 * Author: Gerald Addo-Tetteh
 * Project: Inventory Tracker
 *
 * Error routes
 * This file contains all the routes to the error pages.
 */

const express = require("express");

const errorsController = require("../controllers/errors");

const router = express.Router();

router.get("*", errorsController.get404);

module.exports = router;
