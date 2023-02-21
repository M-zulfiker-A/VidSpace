import express from "express"
import {subscribe, updateUser , unSubscribe, like, dislike, DeleteUser, getUser} from "../Controllers/user.js"
import { verifyToken } from "../verifyToken.js"

const router = express.Router()

router.put("/:id",verifyToken, updateUser)

router.get("/find/:id", getUser)

router.delete("/:id",verifyToken, DeleteUser)

router.put("/sub/:id",verifyToken, subscribe)

router.put("/unsub/:id",verifyToken, unSubscribe)

router.put("/like/:videoId",verifyToken, like)

router.put("/dislike/:videoId",verifyToken, dislike)



export default router