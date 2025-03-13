const express = require("express");
const router = express.Router();
const {   saveDesign, getDesignsByUser, getAllDesigns, updateDesignById, deleteDesignById } = require("../controllers/designController");

router.get("/getDesigns", getAllDesigns);

router.post("/", saveDesign);
router.get("/:userName", getDesignsByUser);
router.put("/update/:id", updateDesignById);
router.delete("/delete/:id", deleteDesignById);

module.exports = router;
