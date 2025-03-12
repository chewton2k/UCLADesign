const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    roomType: { type: String, required: true },
    roomDimensions: { 
        length: { type: Number, required: true }, 
        width: { type: Number, required: true } 
    },
    price: { type: String, required: true }, 
    image: { type: String, required: true }
});

module.exports = mongoose.model("Room", roomSchema);
