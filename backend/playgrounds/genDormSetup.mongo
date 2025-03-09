/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'genDorm';
const collection = 'dormProps';


use(database);

// Create the dormProps collection with schema validation.
db.createCollection(collection, {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["roomType", "roomDimensions", "accountId", "publish", "price"],
      properties: {
        roomType: {
          bsonType: "string",
          description: "Room type is required and must be a string"
        },
        roomDimensions: {
          bsonType: "object",
          required: ["length", "width", "height"],
          properties: {
            length: {
              bsonType: "number",
              description: "Length is required and must be a number"
            },
            width: {
              bsonType: "number",
              description: "Width is required and must be a number"
            },
            height: {
              bsonType: "number",
              description: "Height is required and must be a number"
            }
          },
          description: "Room dimensions must be an object containing length, width, and height"
        },
        accountId: {
            bsonType: ["objectId", "int"],
            description: "Account ID must be an ObjectId or integer"
        },
        publish: {
          bsonType: "bool",
          description: "Publish is required and must be a boolean"
        },
        price: {
          bsonType: "number",
          description: "Price is required and must be a number"
        }
      }
    }
  },
  validationLevel: "strict",
  validationAction: "error"
});


use('genDorm');

// Insert dorm entries with updated pricing and accountId
db.dormProps.insertMany([
  // Classic Dorms
  {
    roomType: "Classic Double",
    roomDimensions: {
      length: 11.5,
      width: 11,
      height: 8 + (7 / 12) // 8 feet 7 inches => 8.5833
    },
    accountId: 0,
    publish: true,
    price: 18269.64 // Classic Double 14P Meals
  },
  {
    roomType: "Classic Triple",
    roomDimensions: {
      length: 11.5,
      width: 11,
      height: 8 + (7 / 12)
    },
    accountId: 0,
    publish: true,
    price: 15164.28 // Classic Triple 14P Meals
  },

  // Deluxe Dorms
  {
    roomType: "Deluxe Double",
    roomDimensions: {
      length: 15.5,
      width: 11 + (9 / 12), // 11 feet 9 inches => 11.75
      height: 9
    },
    accountId: 0,
    publish: true,
    price: 19297.92 // Deluxe Double 14P Meals
  },
  {
    roomType: "Deluxe Triple",
    roomDimensions: {
      length: 15.5,
      width: 11 + (9 / 12),
      height: 9
    },
    accountId: 0,
    publish: true,
    price: 16156.08 // Deluxe Triple 14P Meals
  },

  // Plaza Dorms
  {
    roomType: "Plaza Double",
    roomDimensions: {
      length: 10 + (3 / 12), // 10 feet 3 inches => 10.25
      width: 12,
      height: 8 + (9 / 12) // 8 feet 9 inches => 8.75
    },
    accountId: 0,
    publish: true,
    price: 21616.68 // Plaza Double 14P Meals
  },
  {
    roomType: "Plaza Triple",
    roomDimensions: {
      length: 10 + (3 / 12),
      width: 12,
      height: 8 + (9 / 12)
    },
    accountId: 0,
    publish: true,
    price: 18559.20 // Plaza Triple 14P Meals
  }
]);
