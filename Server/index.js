import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express()
dotenv.config()

const connectDB =()=>{
    mongoose.connect(process.env.MONGO_URL)
        .then(()=> console.log("connected to DB"))
        .catch((err) => {throw err})
}

app.listen(8000 , ()=>{
    console.log("HI")
})