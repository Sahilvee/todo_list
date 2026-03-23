import { loginService } from "../services/authService.js";

export const login = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "Body is undefined" });
        }

         const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

         const result = await loginService(name, password);

        res.status(200).json({
             message: "User Found",
            ...result
        });

    } catch (error) {

             if (error.message === "USER_NOT_FOUND") {
            return res.status(401).json({ message: "User not found" });
        }

         console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};