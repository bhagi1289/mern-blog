import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async(req, res, next)=>{
    try {
        const { username, email, password } = req.body;
        if(!username || !email || !password || username === '' || email === '' || password === ''){
            // return res.status(400).json({message:"All fields are required"});
            next(errorHandler(400, "All fields are required."))
        }

        const hashPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({username, email, password:hashPassword});

        await newUser.save();
        return res.status(200).json({message: "Signup successful..."})
    } catch (error) {
        next(error)
    }

}