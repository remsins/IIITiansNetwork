import Club from "../models/Club.model.js";

// CREATE club
export const createClub = async (req, res) => {
  try {

    const clubData = {
      ...req.body,
      logo: req.file?.path, // 👈 Cloudinary URL
    };

    const club = await Club.create(req.body);
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all clubs
export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find()
      .populate("collegeId", "name")
      .populate("leads", "name email");
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET club by ID
export const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate("collegeId", "name")
      .populate("leads", "name email");

    if (!club) return res.status(404).json({ message: "Club not found" });

    res.json(club);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
