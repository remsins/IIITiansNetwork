import College from "../models/College.model.js";

export const createCollege = async (req, res) => {
  try {
    const college = await College.create(req.body);
    res.status(201).json(college);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college)
      return res.status(404).json({ message: "College not found" });

    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
