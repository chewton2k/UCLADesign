const express = require("express");
const router = express.Router();
const furnitureController = require("../controllers/furnitureController");

router.get("/", furnitureController.getAllFurniture);
router.post("/", furnitureController.addFurniture);
router.get("/:id", furnitureController);
router.put("/:id", furnitureController.updatefurniture);
router.delete("/:id", furnitureController.deleteFurniture);

module.exports = router;