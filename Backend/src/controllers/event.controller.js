import Event from "../models/Events.model.js";

// CREATE event
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("collegeId", "name")
      .populate("clubId", "name")
      .populate("registrations", "name email");

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("collegeId", "name")
      .populate("clubId", "name")
      .populate("registrations", "name email");

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
