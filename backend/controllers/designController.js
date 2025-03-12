const Design = require("../models/Design");

const saveDesign = async (req, res) => {
  const { userName, layout } = req.body;

  if (!userName || !layout) {
    return res.status(400).json({ message: "Username and layout are required." });
  }

  console.log("received design data:", req.body);
  try {
    const newDesign = new Design({ userName, layout });
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

module.exports = {
  saveDesign,
  getDesignsByUser
};
