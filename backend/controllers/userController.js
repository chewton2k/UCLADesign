const User = require("../models/User");
const date = new Date();

const registerUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing)
      return res.status(400).json({ message: "Username already registered to existing user" });

    const user = new User.create({ username, password });
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ error: "User Registration failed" });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (password == user.password)) {
    res.json({
      userId: user._id, 
      username: user.username,
    });
  }
  else {
    res.status(401).json({ message: "Invalid email or password" });
  }
}

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

module.exports = { registerUser, userLogin, getUsers };