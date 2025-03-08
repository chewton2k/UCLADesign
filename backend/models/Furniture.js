const mongoose = require("mongoose");

const furnitureSchema = new mongoose.Schema({
    name: { type: String, required: True},
    length:{ type: Number, required: True},
    width: {type: Nunmber, required: True},
    height: {type: Number} //height not required, if maybe people want to check like poster fittings which would just be flat.
}, {timestamps: true});

module.exports = mongoose.model("Furniture", furnitureSchema);