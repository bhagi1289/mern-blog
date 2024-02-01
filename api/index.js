import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

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

app.use(express.json());
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT} !!!`)
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})