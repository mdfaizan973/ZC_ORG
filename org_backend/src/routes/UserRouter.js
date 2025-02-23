const express = require("express");
const UserModel = require("../models/UserModel");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

/**
 * @route   POST /registers
 * @desc    Register a new user
 * @access  Public
 */
UserRouter.post("/register", async (req, res) => {
  try {
    const { pass, ...otherData } = req.body; // Extract password separately
    const { email } = req.body;

    const isUserPresent = await UserModel.findOne({ email });
    if (isUserPresent) {
      return res.status(201).json({ message: "User Already Present!" });
    }

    // Hash the password before saving to the database
    bcrypt.hash(pass, 10, async function (err, hash) {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({ message: "Error hashing password" });
      }

      try {
        // Create a new user object with hashed password
        const updatedUser = { ...otherData, pass: hash };
        const user = new UserModel(updatedUser);

        // Save the new user to the database
        await user.save();

        // Send success response
        res.status(201).json({ message: "User Added Successfully!", user });
      } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ message: "Failed to save user" });
      }
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route   POST /login
 * @desc    Authenticate user and return token
 * @access  Public
 */
UserRouter.post("/login", async (req, res) => {
  try {
    const { pass, email } = req.body;

    // Find user by email
    const user = await UserModel.find({ email });

    if (user.length > 0) {
      // Compare input password with stored hashed password
      bcrypt.compare(pass, user[0].pass, function (err, result) {
        if (err) {
          console.error("Error comparing password:", err);
          return res.status(500).json({ message: "Error comparing password" });
        }
        if (result === true) {
          // Generate JWT token for authentication
          const token = jwt.sign(
            { userID: user[0]._id, user: user[0].name },
            "oganicstore"
          );
          res.status(201).json({
            msg: "Login successful",
            userDetails: {
              token: token,
              ...user[0]._doc, // Return user details along with token
            },
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route   GET /
 * @desc    Retrieve all users
 * @access  Public
 */
UserRouter.get("/", async (req, res) => {
  try {
    const userData = await UserModel.find(); // Fetch all users from the database

    const userList = {
      total_users: userData.length,
      ...userData,
    };
    res.status(200).json(userList);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route   DELETE /:id
 * @desc    Delete a user by ID
 * @access  Public
 */
UserRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID and delete
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User Deleted Successfully!", id });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/**
 * @route   PUT /:id
 * @desc    Update a user by ID
 * @access  Public
 */
UserRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Get updated user details from request body

    // Find user by ID and update their details
    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated user
      runValidators: true, // Apply validation rules
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = UserRouter;
