const express = require("express");
const router = express.Router();
const { saveDesign, getDesignsByUser } = require("../controllers/designController");

router.post("/", saveDesign);
router.get("/:userId", getDesignsByUser);

module.exports = router;
