const express = require('express');
const router = express.Router();
const {
    createRoom,
    getRoomById,
    getAllRooms
} = require('../controllers/dormController');

router.post('/create-room', createRoom);     
router.get('/:id', getRoomById);   
router.get('/', getAllRooms);


module.exports = router;
