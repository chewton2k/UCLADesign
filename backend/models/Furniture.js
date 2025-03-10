const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
    name: { type: String, required: true},
    length:{ type: Number, required: true},
    width: {type: Number, required: true},
    height: {type: Number} //height not required, if maybe people want to check like poster fittings which would just be flat.
}, {timestamps: true});

module.exports = mongoose.model("userFurniture", furnitureSchema);