import mongoose from "mongoose"
import Users from "../Models/Users.js"
import bcrypt from "bcrypt"
import { createError } from "../error.js"
import jwt from "jsonwebtoken"

export const signUp = async (req,res, next)=>{
    const { name , password , email } = req.body
    
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    try {
        const newUser = await Users.create({name , email , password : hash})
        res.status(200).send("New User Created")
    }catch(err){
        next(err)
    }
}

export const signIn = async (req,res, next)=>{
    const { name , password } = req.body
    try{
        const user = await Users.findOne({name : name})
        if(!user) return next(createError(404 ,"User not found"))
        console.log(req.body.password)
        const passCHeck = await bcrypt.compare(req.body.password , user.password)
        if(!passCHeck) return next(createError(400,"Wrong Credentials"))
        const token = jwt.sign({id : user._id}, process.env.JWT)
        const {password,...others} = user._doc
        res.cookie("access_token",token , {
            httpOnly : true
        }).status(200).json(others)
    }catch(err){
        next(err)
    }
}
