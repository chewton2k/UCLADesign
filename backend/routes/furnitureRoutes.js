const express = require("express");
const router = express.Router();
const furnitureController = require("../controllers/furnitureController");

router.get("/", furnitureController.getAllFurniture);
router.post("/", furnitureController.addFurniture);
router.delete("/:id", furnitureController.deleteFurniture);
router.post("/:id/templates", furnitureController.addTemplateToFurniture);///


module.exports = router;