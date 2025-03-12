const express = require("express");
const router = express.Router();
const {   saveDesign, getDesignsByUser, getAllDesigns, updateDesignById, deleteDesignById } = require("../controllers/designController");

router.post("/", saveDesign);
router.get("/:userId", getDesignsByUser);
router.get("/", getAllDesigns);
router.put("/:id", updateDesignById);
router.delete("/:id", deleteDesignById);

module.exports = router;
