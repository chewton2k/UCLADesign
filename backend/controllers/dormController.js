const Room = require('../models/Dorm'); 


const createRoom = async (req, res) => {
    const { roomType, roomDimensions, price, image } = req.body;

    if (!roomType || !roomDimensions || !price || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newDorm = new Room({ roomType, roomDimensions, price, image, layout: layour || [] });
        const savedDorm = await newDorm.save();
        res.status(201).json(savedDorm);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create dorm', error: error.message });
    }
};


const getRoomById = async (req, res) => {
    try {
        const dorm = await Room.findById(req.params.id);
        if (!dorm) return res.status(404).json({ message: 'Dorm not found' });

        res.status(200).json(dorm);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dorm', error: error.message });
    }
};

const getRoomByImage = async(req, res) => {
    try{
        const rawImage = req.params.imagePath;
        const processedImage = `/${rawImage}`;
        const room = await Room.findOne({image: processedImage});

        if(!room){
            return res.status(404).json({ message: "Room type not found in database"});
        }

        res.status(200).json(room);
    }catch(error){
        res.status(500).json({message: "Failed to fetch room by type", error: error.message});
    }
};

const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        if (!rooms || rooms.length === 0) {
            return res.status(404).json({ message: 'No dorms found' });
        }

        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch dorms', error: error.message });
    }
};




module.exports = {
    createRoom,
    getRoomById, 
    getRoomByImage,
    getAllRooms
};
