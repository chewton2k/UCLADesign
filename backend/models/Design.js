const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
    {
        userName:{type: String, required: true},
        layout: [{
            id: Number, src: String, x: Number, y: Number, rotation: { type: Number, default: 0}
        },
    ],
    }, {timestamps: true}
);

module.exports = mongoose.model("Design", designSchema);