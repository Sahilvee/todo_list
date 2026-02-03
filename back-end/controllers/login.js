import User from "../models/usersmodel.js";
import Jsonwebtoken from "jsonwebtoken"
export const login = async (req, res) => {

  try {
     if(!req.body){
      return  res.status(400).json({message:"Body is undefined"});
     }
     const {name,password}=req.body;

      if(!name || !password){
       return  res.status(400).json({message:"All field required "});

      }
    const user= await  User.findOne({name:name,password:password})
     if(!user){
     return  res.status(401).json({message:"user  not found"})
     }
     const token = Jsonwebtoken.sign(
      {
        userid:user._id,
        name:user.name
      } ,    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
     )
     res.status(200).json({userId:user._id,message:"User Found",token})

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"server error"});
  }
};
