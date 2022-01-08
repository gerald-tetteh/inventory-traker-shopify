/**
 * Author: Gerald Addo-Tetteh
 * Project: Inventory Tracker
 *
 * Inventory routes
 * This file contains the main routes of
 * the application.
 */

const express = require("express");

const inventoryController = require("../controllers/inventory");

const router = express.Router();

router.get("/", inventoryController.getAllInventory);
router.get("/create", inventoryController.getCreateItem);
router.post("/create", inventoryController.postCreateItem);
router.get("/edit/:id", inventoryController.getEditItem);
router.post("/edit", inventoryController.postEditItem);
router.post("/delete", inventoryController.postDelete);
router.get("/export-csv", inventoryController.getExportToCsv);

module.exports = router;
