// BACKEND/utils/seeder.js
//
// Wipes and re-imports the restaurants / menus / fooditems collections from
// the JSON dumps in backend/data/. Run with: npm run seeder

const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

const connectDatabase = require("../config/database");
const Restaurant = require("../models/restaurant");
const Menu = require("../models/menu");
const FoodItem = require("../models/foodItem");

const restaurants = require("../data/restaurants.json");
const menus = require("../data/menus.json");
const fooditems = require("../data/fooditems.json");

// Recursively unwrap MongoDB extended-JSON `{ "$oid": "..." }` into plain
// hex strings so Mongoose can cast them normally.
function unwrapExtendedJSON(value) {
  if (Array.isArray(value)) {
    return value.map(unwrapExtendedJSON);
  }
  if (value && typeof value === "object") {
    if (typeof value.$oid === "string" && Object.keys(value).length === 1) {
      return value.$oid;
    }
    if (typeof value.$date === "string" && Object.keys(value).length === 1) {
      return new Date(value.$date);
    }
    const result = {};
    for (const key of Object.keys(value)) {
      result[key] = unwrapExtendedJSON(value[key]);
    }
    return result;
  }
  return value;
}

const seedData = async () => {
  try {
    await connectDatabase();

    console.log("Clearing existing restaurants, menus and fooditems...");
    await Restaurant.deleteMany();
    await Menu.deleteMany();
    await FoodItem.deleteMany();

    console.log("Importing fooditems...");
    await FoodItem.insertMany(unwrapExtendedJSON(fooditems));

    console.log("Importing restaurants...");
    await Restaurant.insertMany(unwrapExtendedJSON(restaurants));

    console.log("Importing menus...");
    await Menu.insertMany(unwrapExtendedJSON(menus));

    console.log(
      `Done: ${restaurants.length} restaurants, ${menus.length} menus, ${fooditems.length} fooditems.`
    );
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
