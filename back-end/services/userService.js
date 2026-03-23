import User from "../models/usersmodel.js";


export const updateUserNameService = async (userId, name) => {
  if (!name || name.trim() === "" ) {
    throw new Error(" Name is required ");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found ");
  }


  // ✅ Only update name
  user.name = name.trim();

  await user.save();

  return user;
};


export const getUserService = async (userId) => {
  const  user = await User.findById(userId);

  if (!user) {
     throw new Error("User  not  found ");
  }

  return user; 
};