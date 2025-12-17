import Event from "../models/Events.model.js";
import cloudinary from "../config/cloudinary.js";

// CREATE event
// import Event from "../models/Events.model.js";

export const createEvent = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }
    const {
      title,
      description,
      date,
      collegeName,
      clubName,
      link // ✅ optional
    } = req.body;

    // ✅ validate ONLY required fields
    if (!title || !date || !collegeName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let bannerData = {};

    if (req.file) {
      bannerData = {
        public_id: req.file.public_id,
        url: req.file.path,
      };
    }

    const event = await Event.create({
      title,
      description,
      date,
      collegeName,
      clubName: clubName || "",
      link, // ✅ safe default
      banner: bannerData,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// GET all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("registrations", "name email")
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("registrations", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      collegeName,
      clubName,
      link,
    } = req.body;

    let updateData = {
      title,
      description,
      date,
      collegeName,
      clubName,
      link,
    };

    if (req.file) {
      updateData.banner = {
        public_id: req.file.public_id,
        url: req.file.path,
      };
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("UPDATE EVENT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// import Event from "../models/Events.model.js";


export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 🔒 NEVER allow Cloudinary failure to crash delete
    if (event.banner?.public_id) {
      try {
        await cloudinary.uploader.destroy(event.banner.public_id);
      } catch (cloudErr) {
        console.error(
          "CLOUDINARY DELETE FAILED:",
          event.banner.public_id,
          cloudErr.message
        );
      }
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("DELETE EVENT ERROR:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

