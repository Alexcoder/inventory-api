import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import UserInventory from '../model/user.js';


export const signIn = async(req, res) => {
     const {username, password} = req.body;
  
     try{
     const existingUser =  await UserInventory.findOne({username});
     if(!existingUser) res.status(400).json({message:"User does not exist"});

    const isPasswordCorrect =  await bcrypt.compare(password, existingUser.password);
    if(!isPasswordCorrect) res.status(401).json({message:"Wrong password"});

    const token = jwt.sign({username: existingUser.username, id: existingUser._id}, process.env.SECRET , {expiresIn: "1D"});

    res.status(200).json({result: existingUser, token});
     }catch(error){
      res.status(500).cookie("access_token", token, {httpOnly: false,secure: true,
          sameSite: 'none', maxAge: 24*60*60*1000
      }).json({message: "Something went wrong"})
     }
}

export const signUp = async(req, res) => {
     const {username, password, confirmPassword, firstName, lastName} = req.body;
  
     try{
     const existingUser =  await UserInventory.findOne({username});
     if(existingUser) res.status(400).json({message:"User already exist"});

     if(password !== confirmPassword) res.status(402).json({message : "Password mismatch"});
    
     const salt = await bcrypt.genSalt(12)
    const hashedPassword =  await bcrypt.hash(password, salt);
    const result = await UserInventory.create({username, password: hashedPassword, name: `${firstName} ${lastName}`});

    const token = jwt.sign({username: result.username, id: result._id}, process.env.SECRET , {expiresIn: "3d"});
  
   res.status(200).json({result, token})
    ;
     }catch(error){
      res.status(501).json({message: "Something went wrong"})
     }
}

