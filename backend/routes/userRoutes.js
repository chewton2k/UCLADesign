const express = require("express");
const { registerUser, userLogin, getUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post('/login', userLogin);
router.get("/user", getUsers);

module.exports = router;