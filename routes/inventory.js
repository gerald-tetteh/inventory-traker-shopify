const express = require("express");
const { route } = require("express/lib/router");

const inventoryController = require("../controllers/inventory");

const router = express.Router();

router.get("/", inventoryController.getAllInventory);
router.get("/create", inventoryController.getCreateItem);
router.post("/create", inventoryController.postCreateItem);
router.get("/edit/:id", inventoryController.getEditItem);
router.post("/edit", inventoryController.postEditItem);

module.exports = router;
