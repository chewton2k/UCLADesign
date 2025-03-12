const express = require('express');
const router = express.Router();
const {
    createRoom,
    getRoomById
} = require('../controllers/dormController');

router.post('/', createRoom);     
router.get('/:id', getRoomById);   

module.exports = router;
