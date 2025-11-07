import path from "path";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
dotenv.config();
const __dirname = path.resolve();
const PORT=process.env.PORT||3000;

const app=express();

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
if(process.env.NODE_ENV==="production"){
   app.use(express.static(path.join(__dirname, "../frontend/dist")));
   app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});
}
app.listen(3000,()=>console.log("server started at: "+ PORT));