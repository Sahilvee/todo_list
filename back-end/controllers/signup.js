import User from "../models/usersmodel.js";

export const signup = async (req, res) => {
  try {

    // 1️⃣ Check body
    if (!req.body) {
      return res.status(400).json({
        message: "Body is undefined"
      });
    }

    const { name, email, password } = req.body;

    // 2️⃣ Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    // 3️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

    // 4️⃣ Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    // 5️⃣ Send response
    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};