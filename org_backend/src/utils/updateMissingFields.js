const updateMissingFields = async (Model) => {
  try {
    // Get all schema fields dynamically
    const schemaPaths = Model.schema.paths;

    let updateQuery = {};

    // Loop through schema fields and add missing ones dynamically
    Object.keys(schemaPaths).forEach((field) => {
      if (field !== "_id" && field !== "__v") {
        updateQuery[field] = { $ifNull: [`$${field}`, ""] }; // Set missing fields to null
      }
    });

    // Apply update to all documents
    await Model.updateMany({}, [{ $set: updateQuery }]);

    console.log(`Missing fields updated for ${Model.modelName}`);
  } catch (error) {
    console.error("Error updating missing fields:", error);
  }
};

module.exports = updateMissingFields;

// How to use ?...
// Import ----
//const updateMissingFields = require("../utils/updateMissingFields");
//const Product = require("../models/Product");
// Use-----
// Call the function for the Product model
//updateMissingFields(Product);
