import { createError } from "../error.js"
import Comments from "../Models/Comments.js"
import Video from "../Models/Video.js"



export const getComments = async (req,res,next)=>{
    try {
        const comments = await Comments.find({ videoId : req.params.videoId})
        res.status(200).json({
            comments
        })
    } catch (error) {
        next(error)
    }
}

export const postComments = async (req,res,next)=>{
    try {
        const comments = await Comments.create({...req.body, userId : req.user.id})
        res.status(200).json({
            success: "comments added",  
            comments
        })
    } catch (error) {
        next(error)
    }
}

export const deleteComments = async (req,res,next)=>{
    
    try {
        const comment =await Comments.findById(req.params.id)
        const video = await Video.findById(comment.videoId)
        if(comment.userId !== req.user.id && video.userId !== req.user.id) return next(createError(402,"You can only delete your comment"))
        await comment.deleteOne()
        res.status(200).json({
            success: "comments deleted",
            comment
        })
    } catch (error) {
        next(error)
    }
}

// export const updateComments = async (req,res,next)=>{
//     try {
//         const comments = await Comments.findByIdAndDelete(req.params.id)
//         res.status(200).json({
//             success: "comments deleted",
//             comments
//         })
//     } catch (error) {
//         next(error)
//     }
// }