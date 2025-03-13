const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
    {
        userName:{type: String, required: true},
        layout: [{
            id: Number, src: String, x: Number, y: Number,
        },
    ],
    }, {timestamps: true}
);

module.exports = mongoose.model("Design", designSchema);