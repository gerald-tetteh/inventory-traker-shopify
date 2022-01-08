const express = require("express");

const inventoryController = require("../controllers/inventory");

const router = express.Router();

router.get("/", inventoryController.getAllInventory);

module.exports = router;
