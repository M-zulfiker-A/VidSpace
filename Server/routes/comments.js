import express from "express"
import { deleteComments, getComments, postComments} from "../Controllers/comment.js"
import { verifyToken } from "../verifyToken.js"
const router = express.Router()

router.get("/:videoId",getComments)
router.post("/",verifyToken,postComments)
router.delete("/:id",verifyToken,deleteComments)

export default router