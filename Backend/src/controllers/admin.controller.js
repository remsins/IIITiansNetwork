import Admin from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// CREATE ADMIN (use once, then disable)
export const createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const exists = await Admin.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin created",
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET)
      throw new Error("JWT_SECRET not configured");

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    admin.lastLogin = new Date();
    await admin.save();

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET CURRENT ADMIN
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId).select("-password");
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    res.json(admin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
