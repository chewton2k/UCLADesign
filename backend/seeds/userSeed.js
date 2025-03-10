require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
connectDB();


const defaultUsers = [
    { username: "Ruijun", email: "ruijun@g.ucla.edu", password: "1234" },
    { username: "Owen", email: "owen@g.ucla.edu", password: "password" },
    { username: "Alex", email: "alex@g.ucla.edu", password: "p@ssword" },
    { username: "Charlton", email: "charlton@g.ucla.edu", password: "newPassword" }
];

async function seedDatabase(){
    try{
        await User.deleteMany();
        await User.insertMany(defaultUsers);
        console.log("User database seeded!");
        mongoose.connection.close();
    }catch(error){
        console.error("Error seeding database with Users:", error);
    }
};

seedDatabase();