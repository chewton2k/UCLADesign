const mongoose = require("mongoose");

const designSchema = new mongoose.Schema(
    {
        userName:{type: String, required: true},
        userId:{type: Number, required: true},
        layout: [{
            room: { type: String, required: true },
            objects: [{
                obj_id: {type: String, required: true},
                name: {type: String, required: true},
                position: {
                    x: {type: Number, required: true},
                    y: {type: Number, required: true},
                }
            }],
            image: {type: String},
        }],
    }, {timestamps: true}
);

module.exports = mongoose.model("Design", designSchema);