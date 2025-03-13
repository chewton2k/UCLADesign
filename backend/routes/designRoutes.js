const express = require("express");
const router = express.Router();
const {   saveDesign, getDesignsByUser, getAllDesigns, updateDesignById, deleteDesignById } = require("../controllers/designController");

router.post("/", saveDesign);
router.get("/:userId", getDesignsByUser);
router.get("/getDesigns/", getAllDesigns);
router.put("/update/:id", updateDesignById);
router.delete("/delete/:id", deleteDesignById);

module.exports = router;
