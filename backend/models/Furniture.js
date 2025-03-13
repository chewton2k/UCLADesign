const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({///
    imageUrl: { type: String, required: true },
    rating: { 
        type: Number, 
        required: true, 
        min: 0, 
        max: 5, 
        default: 0.0 
    }
});

const furnitureSchema = new mongoose.Schema({
    name: { type: String, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    image: { type: String, required: true },
    user: { type: String, required: true, default: "All" } 
});

module.exports = mongoose.model("userFurniture", furnitureSchema);