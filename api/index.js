import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import userRoutes from "./routes/user.route.js";

dotenv.config();


const mongoConnectionString = process.env.MONGO_URI;
mongoose.connect(mongoConnectionString)
.then(()=>{
    console.log("MongoDB is connected.......");
})
.catch((error)=>{
    console.log(error);
});

const app = express();

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} !!!`)
});

app.use("/api/user", userRoutes);