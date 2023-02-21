import express from "express"
import {deleteVideo, getVideo, updateVideo , addVideo, randomVideo, subbedVideos, addView, trending, search, getByTags} from "../Controllers/video.js"
import {verifyToken} from "../verifyToken.js"

const router = express.Router()

router.post("/",verifyToken,addVideo)
router.get("/find/:id",getVideo)
router.put("/:id",verifyToken,updateVideo)
router.delete("/:id",verifyToken,deleteVideo)
router.put("/view/:id",verifyToken,addView)
router.get("/trend",trending)
router.get("/random", randomVideo)
router.get("/sub",verifyToken,subbedVideos)
router.get("/search", search)
router.get("/tags", getByTags)
export default router