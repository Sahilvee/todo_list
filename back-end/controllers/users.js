import { getUserService,updateUserNameService} from "../services/userService.js";
export const users = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                 message: "User ID is required"
            });
        }

  const user = await getUserService(id);

        res.status(200).json({ user });

    } catch (error) {

        if (error.message === "USER_NOT_FOUND") {
            return res.status(404).json({
                message: "User not found"
            });
        }

           console.log(error);
        res.status(500).json({
            message: "Server error"
        });
    }
};


export const updateUser = async (req, res) => {
  try {

    const { id } = req.params;
    const { name } = req.body;

    const updatedUser = await  updateUserNameService(id, name);
    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error)  {
 res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};