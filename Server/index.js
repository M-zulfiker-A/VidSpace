import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import commentsRoute from "./routes/comments.js"
import videosRoute from "./routes/videos.js"
import usersRoute from "./routes/users.js"
import authRouter from "./routes/auth.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/comments",commentsRoute)
app.use("/api/auth",authRouter)
app.use("/api/users",usersRoute)
app.use("/api/videos",videosRoute)
app.use((err, req, res, next)=>{
    const status = err.status || 500
    const message = err.message || "Something went wrong"
    res.status(status).json({
        success : false,
        message,
        status
    })
})

const connectDB =()=>{
    mongoose.set("strictQuery" , true)
    mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log("connected to DB"))
        .catch((err) => {throw err})
}

app.listen(8000 , ()=>{
    connectDB()
    console.log("HI")
})