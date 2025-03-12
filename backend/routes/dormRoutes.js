const express = require('express');
const router = express.Router();
const {
    createRoom,
    getRoomById,
    getRoomByImage,
    getAllRooms
} = require('../controllers/dormController');

router.post('/create-room', createRoom);     
router.get('/:id', getRoomById);
router.get(`/image/:imagePath`, getRoomByImage);   
router.get('/', getAllRooms);


module.exports = router;
