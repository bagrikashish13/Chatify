import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import {connectDB }from "./lib/db.js";
import dotenv from "dotenv";

const app=express();
dotenv.config();
const __dirname = path.resolve();

const PORT=process.env.PORT||3000;

app.use(express.json());
app.use(cors({origin:process.env.CLIENT_URL, credentials:true,}));
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

if(process.env.NODE_ENV==="production"){
   app.use(express.static(path.join(__dirname, "../frontend/dist")));

   app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
   });
}
app.listen(PORT,()=>{
        console.log("server started at: "+ PORT)
        connectDB()
}
); 