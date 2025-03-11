const User = require("../models/User");
const date = new Date();
const bcrypt = require("bcrypt");
const MAX_ATTEMPTS = 3;
const LOCKTIME = 60*1000;

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  // Validate input
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields (username, email, password) are required" });
  }

  // Password validation
  if (password.length <= 5) {
    return res.status(400).json({ message: "Password must be more than 5 characters" });
    }
  if (!/\d/.test(password)) {
    return res.status(400).json({ message: "Password must contain at least one number" });
    }
  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res.status(400).json({ message: "Username or email already registered" });

    // Create the user
    const user = await User.create({ username, email, password: hashedPassword, loginAttempts: 0 }); 
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "User Registration failed" });
  }
};

const userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    if (user.lockTime && user.lockTime > Date.now()) {
      const remainingTime = Math.ceil((user.lockTime - Date.now()) / 1000); 
      return res.status(403).json({ message: `Account Locked. Try again in ${remainingTime} seconds.`});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      user.loginAttempts = 0; // Reset counter
      user.lockUntil = null;
      await user.save();
      return res.json({
        userId: user._id,
        username: user.username,
      });
    }

    // Handle invalid password case
    user.loginAttempts = (user.loginAttempts || 0) + 1;

    if (user.loginAttempts >= MAX_ATTEMPTS) {
      user.lockTime = new Date(Date.now() + LOCKTIME);
      await user.save();
      return res.status(403).json({ message: "Too many failed login attempts. Account locked for 1 minutes." });
    }

    await user.save();
    return res.status(401).json({ message: "Invalid username or password" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Login failed" });
  }
};


const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

module.exports = { registerUser, userLogin, getUsers };