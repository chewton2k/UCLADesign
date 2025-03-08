const furniture = require("../models/Furniture");

exports.getAllFurniture = async(req, res) => {
    try{
        const furniture = await Furniture.find();
        res.json(furniture);
    } catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.addFurniture = async (req, res) => {
    const { name, length, width, height } = req.body;
    try{
        const newFurniture = new Furniture({ name, length, width, height });
        await newFurniture.save();
        res.status(201).json(newFurniture);
    } catch (err){
        res.status(400).json({ error: err.message });
    }
};

exports.getFurnitureById = async (req, res) => {
    try {
        const furniture = await Furniture.findById(req.params.id);
        if(!furniture) return res.status(404).json({message: "Furniture not found"});
        res.json(furniture);
    } catch(err){
        res.status(500).json({ error: err.message});
    }
};

exports.updateFurniture = async (req, res) => {
    try{
        const updatedFurniture = await Furniture.findByIdAndUpdate(req.params.id, req.body,{new: true});
        if(!updatedFurniture) return res.status(404).json({message: "Furniture not found"});
        res.json(updatedFurniture);
    }catch(err){
        res.status(500),json({ error: err.message });
    }
};

exports.deleteFurniture = async (req, res) => {
    try{
        const deletedFurniture = await Furniture.findByIdAndDelete(req.params.id);
        if(!deletedFurniture) return res.stats(404).json({message: "Furniture not found"});
        res.json({message: "Furnituyre deleted sucessfully"});
    } catch(err){
        res.status(50).json({ error: err.message });
    }
};