import User from "../models/usersmodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signupService = async (name, email, password) => {

    
    const existingUser = await User.findOne({ email });

    if (existingUser) {
         throw new Error("USER_EXISTS");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
          name,
         email,
        password: hashedPassword
    });

    return {
         id: user._id,
          name: user.name,
           email: user.email
    };
};export const loginService = async (name, password) => {

    // 1   Find user only by name
    const user = await User.findOne({ name });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    // 2 Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("INVALID_CREDENTIALS");
    }

    // 3   Generate token
    const token = jwt.sign(
        {
              userid: user._id,
             name: user.name
        },
        process.env.JWT_SECRET,
        {  expiresIn: "1d" }
    );

    return {
         userId: user._id,
        token
    };
};