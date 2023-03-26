import express from "express"
import { createError } from "../error.js"
import Users from "../Models/Users.js"
import Video from "../Models/Video.js"
const router = express.Router()
export const updateUser = async (req,res,next)=>{
    if(req.params.id !== req.user.id){
        return next(createError(403,"YOu cannot update other user"))
    }else{
        try{
            const userTobeUpdated = await Users.findByIdAndUpdate(req.params.id,{
                $set : req.body
            }, {new : true})
            res.status(200).json({
                userTobeUpdated
            })
        }catch(err){
            next(err)
        }
    }
}
export const DeleteUser = async (req,res,next)=>{
    if(req.params.id !== req.user.id){
        return next(createError(403,"YOu cannot delete other user"))
    }else{
        try{
            const userTobedeleted = await Users.findByIdAndDelete(req.params.id)
            res.status(200).json({
                message : "deleted User",
                userTobedeleted
            })
        }catch(err){
            next(err)
        }
    }
}
export const getUser = async (req,res,next)=>{
    try{
        const finduser = await Users.findById(req.params.id)
        const {password , ...userdetails} = finduser._doc
        res.status(200).json(userdetails)
    }catch(err){
        next(err)
    }
}
export const subscribe = async(req,res,next)=>{
    try{
        const subbedChannel = await Users.findById(req.params.id)
        const user = await Users.findById(req.user.id)
        const isSubbed = user.SubscribedUsers.some(id => id=== req.params.id)
        console.log(isSubbed)
        if(!isSubbed){
            await subbedChannel.updateOne({
                $inc : { Subscribers : 1 }
            })
            await Users.findByIdAndUpdate(req.user.id,{
                $addToSet : {SubscribedUsers : req.params.id} 
            })
            res.status(200).json({
                message : "Subscribed to :"+subbedChannel.name
            })
        }else{
            res.status(200).json({
                success : false,
                message : "You are already a subscriber"
            })
        }
        
    }catch(err){
        next(err)
    }
}
export const unSubscribe = async (req,res,next)=>{
    try{
        const UnsubbedChannel = await Users.findById(req.params.id)
        const user = await Users.findById(req.user.id)
        const isSubbed = user.SubscribedUsers.some(id => id=== req.params.id)
        if(isSubbed){
            await Users.findByIdAndUpdate(req.params.id,{
                $inc : { Subscribers : -1 }
            })
            await Users.findByIdAndUpdate(req.user.id,{
                $pull : {SubscribedUsers : req.params.id}
            })
            res.status(200).json({
                message : "Unsubscribed to :"+UnsubbedChannel.name
            })
        }else{
            res.status(200).json({
                success : false,
                message : "You are already not a subscriber"
            }) 
        }
        
    }catch(err){
        next(err)
    }
}
export const like = async (req,res,next)=>{
    const videoId = req.params.videoId
    try {
        const video =await Video.findById(videoId)
        if(video.likes.includes(req.user.id)){
            await video.updateOne({
                $pull : {likes : req.user.id}
            })
            res.status(200).json({
                message : "Removed from Likes"
            })
        }
        await video.updateOne({
            $addToSet : { likes : req.user.id },
            $pull : {dislikes : req.user.id}
        })
        res.status(200).json({
            message : "Video liked"
        })
    } catch (error) {
        next(error)
    }

}
export const dislike = async (req,res,next)=>{
    const videoId = req.params.videoId
    try {
        const video =await Video.findById(videoId)
        if(video.dislikes.includes(req.user.id)){
            await video.updateOne({
                $pull : {dislikes : req.user.id}
            })
            res.status(200).json({
                message : "Removed from disLikes"
            })
        }
        await video.updateOne({
            $addToSet : { dislikes : req.user.id },
            $pull : {likes : req.user.id}
        })
        res.status(200).json({
            message : "Video disliked"
        })
    } catch (error) {
        next(error)
    }

}
