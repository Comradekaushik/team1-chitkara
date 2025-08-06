import auth from "../Models/Auth.model.js";
import event from "../Models/Event.model.js";

export const createEvent = async (req, res) => {
  try {
    const { location, description, eventName, userId } = req.body;
    if (!location || !description || !eventName || !userId) {
      return res.status(400).json({ message: "Missing required field" });
    }

    const user = await auth.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: "Organiser not found" });
    }

    if (user.role !== "organiser") {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const createEvent = await event.create({
      location,
      description,
      eventName,
      date: Date.now(),
    });
    return res
      .status(201)
      .json({ message: "Event created", Event: createEvent });
  } catch (error) {
    console.error("event create error: ", error);
    return res.status(500).json({ message: "Interval server error" });
  }
};

export const registerEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;
    if (!userId || !eventId) {
      return res.status(400).json({ message: "Missing required field" });
    }

    const existingUser = await auth.findById(userId);
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    if (existingUser.role !== "user") {
      return res.status(400).json({ message: "Unauthorized" });
    }

    const existingEvent = await event.findById(eventId);
    if (!existingEvent) {
      return res.status(400).json({ message: "Event not found" });
    }

    const userIds = existingEvent.userId;
    if (userIds.includes(userId)) {
      return res.status(400).json({ message: "User already added in event" });
    }
    const updateUser = await event.findByIdAndUpdate(eventId, {$set: {userId: userId}}, {new: true});
    return res
      .status(200)
      .json({ message: "Successfully register for this event"});
  } catch (error) {
    console.error("event register error: ", error);
    return res.status(500).json({ message: "Interval server error" });
  }
};
