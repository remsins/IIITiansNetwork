import User from "../models/user.model.js";

// CREATE user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .populate("collegeId", "name")
      .populate("clubs", "name");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("collegeId", "name")
      .populate("clubs", "name");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
