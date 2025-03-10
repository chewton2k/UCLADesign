require("dotenv").config();
const mongoose = require("mongoose");
const Furniture = require("../models/Furniture.js");


const defaultFurniture = [
    { name: "Desk", length: 24, width: 43, height: 58 },
    { name: "Bed", length: 85, width: 38, height: 72 },
    { name: "Fridge", length: 17, width: 19, height: 37 },
    { name: "Closet", length: 25, width: 36, height: 56 }
];

async function seedDatabase(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB furniture");

        await Furniture.deleteMany();
        await Furniture.insertMany(defaultFurniture);
        console.log("Furniture database seeded!");
        mongoose.connection.close();
    }catch(error){
        console.error("Error seeding database: with furniture", error);
    }
};

seedDatabase();