const express = require("express");
const router = express.Router();
const furnitureController = require("../controllers/furnitureController");

router.get("/", furnitureController.getAllFurniture);
router.post("/", furnitureController.addFurniture);
router.get("/:id", furnitureController.getFurnitureById);
router.put("/:id", furnitureController.updateFurniture);
router.delete("/:id", furnitureController.deleteFurniture);
router.post("/:id/templates", furnitureController.addTemplateToFurniture);///


module.exports = router;