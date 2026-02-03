import User from "../models/usersmodel.js";
// get  user detail
export const users= async(req,res)=>{
            const  { id}= req.params;
            try {
                 if(!id){
                return res.status(400).json({message:"userid is not there"});
            }
         const user=   await User.findById(id);
         if(!user){
            return res.status(404).json({message:"user not found "});
         }
         res.status(200).json({user});
                
            } catch (error) {
                console.log(error);
                res.status(500).json({message:"server error"});
            }
           

}