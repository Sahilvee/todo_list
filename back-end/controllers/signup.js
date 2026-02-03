import User from '../models/usersmodel.js'
export const signup= async(req,res)=>{
   try {

         if(!req.body){
      return res.status(400).json({message:"Body is undefined"});

   }
      const {name,email,password}=req.body;
   if(!password||!name||!email){
      return res.status(400).json({message:"All field required"});
   }
     const user=  await User.create({name ,email,password});

    
   res.status(200).json({ message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }});
      
   } catch (error) {
      console.log(error);
   res.status(500).json({ message: "Server error" });
   }

    

}