import User from "../models/usersmodel.js";

export const signup = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Body is undefined"
      });
    }


    
    const { name, email, password } = req.body;
   
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists"
      });
    }

 
    const user = await User.create({
       name,
      email,
        password
    });
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
