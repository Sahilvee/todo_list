import { signupService } from "../services/authService.js";

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

              const user = await signupService(name, email, password);

        res.status(201).json({
            message: "Signup successful",
            user
         });

    } catch (error) {

        if (error.message === "USER_EXISTS") {
            return res.status(409).json({
                message: "User already exists"
             });
        }

                 console.log(error);
        res.status(500).json({
             message: "Server error"
        });
    }
};