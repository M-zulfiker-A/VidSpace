
import { createError } from "./error.js";
import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token
    if(!token) return next(createError(401, "Not authorized"))
    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(401, "Wrong access token"))
        req.user = user
        next()
    })
}