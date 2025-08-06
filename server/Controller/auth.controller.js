import auth from "../Models/Auth.model.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export const signUp = async (req, res) => {
  try {
    const { email, name, username, password, role } = req.body;
    if (!email || !name || !username || !password || !role) {
      return res.status(400).json({ message: "Missing required field" });
    }

    const validRoles = ["user", "organiser"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (name === username) {
      return res
        .status(400)
        .json({ message: "name and username should be different" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    const user = await auth.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await auth.create({
      email,
      username,
      name,
      password: hashedPassword,
      role,
    });
    return res
      .status(201)
      .json({ message: "signUp succesfull", user: newUser });
  } catch (error) {
    console.error("signUp error: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const authstring = crypto.randomBytes(32).toString("hex");
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing required field" });
    }

    const existingUser = await auth.findOne({email});
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isCorrect) {
      return res.status(400).json({ message: "Unauthorized"});
    }

    const userId = existingUser.id;
    const updateUser = await auth.findByIdAndUpdate(userId, {$set: {token: authstring}}, {new: true});
    return res
      .status(200)
      .json({
        message: "Login successfully",
        isAuthenticated: "true",
        user: updateUser,
    });

  } catch (error) {
        console.error("signUp error: ", error);
        return res.status(500).json({ message: "Internal server error" });
  }
};
