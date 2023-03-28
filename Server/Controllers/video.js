import Video from "../Models/Video.js"
import mongoose from "mongoose"
import { createError } from "../error.js"
import Users from "../Models/Users.js"


export const addVideo = async(req,res,next)=>{
    try{
        const newVideo = Video.create({userId : req.user.id , ...req.body})
        res.status(200).json({
            success : true,
            message : "Video has been added"
        })
    }catch(err){
        next(err)
    }
}
export const updateVideo = async(req,res,next)=>{
    const foundVideo = await Video.findById(req.params.id)
    if(!foundVideo) return next(createError(404, "Video not Found"))
    console.log(foundVideo, req.user)
    if(foundVideo.userId !== req.user.id) return next(createError(402,"You can only update your video"))
    try{
        
        const video = await foundVideo.updateOne({
            $set : req.body
        },{new : true})
        res.status(200).json({
            success : true,
            message : "Video has been updated"  
        })
    }catch(err){
        next(err)
    }
}
export const deleteVideo = async(req,res,next)=>{
    const foundVideo = await Video.findById(req.params.id)
    if(!foundVideo) return next(createError(404, "Video not Found"))
    if(foundVideo.userId !== req.user.id) return next(createError(402,"You can only delete your video"))
    try{
        await Video.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success : true,
            message : "Video has been deleted"  
        })
    }catch(err){
        next(err)
    }
}
export const getVideo = async(req,res,next)=>{
    try{
       const video = await Video.findById(req.params.id)
       if(!video) return next(createError(404,"Video not found"))
       res.status(200).json({
        video
       })
    }catch(err){
        next(err)
    }
}

export const addView =async (req, res, next)=>{
    try{
        const video = await Video.findByIdAndUpdate(req.params.id,{
            $inc : {views : 1}
        })
        res.status(200).json({
            message : "view count updated",
            video
        })
     }catch(err){
         next(err)
     }
}

export const trending =async (req, res, next)=>{
    try{
        const videos = await Video.find().sort({views : -1})
        res.status(200).json({
            videos
        })
     }catch(err){
         next(err)
     }
}

export const randomVideo =async (req, res, next)=>{
    try{
        const videos = await Video.aggregate([{ $sample : {size : 40}}])
        res.status(200).json({
            videos
        })
     }catch(err){
         next(err)
     }
}

export const subbedVideos = async(req,res,next)=>{
    try {
        const user = await Users.findById(req.user.id)
        const subbedChannels = user.SubscribedUsers
        const videosList =  await Promise.all(
            subbedChannels.map(channel => Video.find({userId : channel}))
        )
        res.status(200).json({videos :videosList.flat().sort((a,b)=> b.createdAt - a.createdAt)})
    } catch (error) {
        next(error)
    }
}

export const getByTags = async (req,res,next)=>{
    const tags =  req.query.tags.split(",")
    console.log(tags)
    try {
        const videos =await Video.find({ tags : { $in : tags }}).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}

export const search = async (req,res,next)=>{
    const query = req.query.q
    console.log(query)
    try {
        const videos =await Video.find({ title : { $regex : query , $options : "i"}}).limit(20)
        res.status(200).json(videos)
    } catch (error) {
        next(error)
    }
}