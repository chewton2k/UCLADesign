const Furniture = require("../models/Furniture");

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


/* //example tests
exports.addFurniture = async (req, res) => {
    const { name, length, width, height } = req.body;
    
    // Default templates for testing
    const defaultTemplates = [
        { imageUrl: "https://conferences.ucla.edu/wp-content/uploads/2019/02/Dorm-triple-pic.jpg", rating: 5.0 },
        { imageUrl: "https://studios.imgix.net/img/gallery-images/assets/uploads/UCLA_GH_DormRoom1_3.jpg?q=85", rating: 4.0 }
    ];

    try {
        const newFurniture = new Furniture({
            name: "Test Furniture",
            length: 100,
            width: 50,
            height: 200,
            templates: defaultTemplates
        });

        await newFurniture.save();
        res.status(201).json(newFurniture); 
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};  */


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

exports.addTemplateToFurniture = async (req, res) => {///
    const {id} = req.params; 
    const {imageUrl, rating} = req.body;

    try {
        const furniture = await Furniture.findById(id);
        if (!furniture) {
            return res.status(404).json({ message: "Furniture is not found" });
        }

        furniture.templates.push({ imageUrl, rating });
        await furniture.save();

        res.status(201).json(furniture);
    } catch (error) {
        res.status(500).json({ message: "Error while adding template", error });
    }
};
