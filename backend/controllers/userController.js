const User = require("../models/User");
const date = new Date();

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields (username, email, password) are required" });
  }
  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res.status(400).json({ message: "Username or email already registered" });

    // Create the user
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.error(error);
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