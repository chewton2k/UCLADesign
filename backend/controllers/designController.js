const Design = require("../models/Design");

const saveDesign = async (req, res) => {
  const { userName, userId, layout } = req.body;

  if (!userName || !layout) {
    return res.status(400).json({ message: "Username and layout are required." });
  }

  console.log("received design data:", req.body);
  try {
    const newDesign = new Design({ userName, userId, layout });
    const saved = await newDesign.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("failed to save", error);
    res.status(500).json({ message: "Failed to save design", error: error.message });
  }
};

const getDesignsByUser = async (req, res) => {
  try {
    const designs = await Design.find({ userId: req.params.userId });
    res.status(200).json(designs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch designs", error: error.message });
  }
};

const getAllDesigns = async (req, res) => {
  try {
      const designs = await Design.find();
      res.status(200).json(designs);
  } catch (error) {
      res.status(500).json({ message: "Error fetching all designs", error });
  }
};

const updateDesignById = async (req, res) => {
  try {
      const updatedDesign = await Design.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedDesign) return res.status(404).json({ message: "Design not found" });

      res.status(200).json(updatedDesign);
  } catch (error) {
      res.status(500).json({ message: "Error updating design", error });
  }
};

const deleteDesignById = async (req, res) => {
  try {
      const deleted = await Design.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Design not found" });

      res.status(200).json({message: "Design deleted"});
  } catch (error) {
      res.status(500).json({ message: "Error deleting design", error });
  }
};

module.exports = {
  saveDesign,
  getDesignsByUser,
  getAllDesigns,
  updateDesignById,
  deleteDesignById
};
