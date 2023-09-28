import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// User register
export const register = async(req, res) => {
    try{
        // Hashing password
        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            photo: req.body.photo
        });
        await newUser.save();
        res.status(200).json({success: true, message: "Successfully created", data: newUser});
    } catch(err){
        res.status(500).json({success: false, message: "Failed to Register. Try again."});
    }
};


// User login
export const login = async(req, res) => {
    const email = req.body.email;
    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }

        // Checking hashed password
        const checkHashedPassword = await bcrypt.compare(req.body.password, user.password);
        if(!checkHashedPassword){
            return res.status(401).json({success: false, message: "Incorrect mail or password"});
        }

        const {password, role, ...rest} = user._doc;

        // Creating JWT token
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, { expiresIn: "15d"});

        // Setting token in the browser and send the response to the client.
        res.cookie("accessToken", token, {
            httpOnly: true,
            expires: token.expiresIn
        }).status(200).json({success: true, message: "User logged in.", data: {...rest}});
    } catch(err) {
        res.status(500).json({success: false, message: "Failed to Login. Try again."});
    }
};