import express from "express";
import dbconnect from "./db/db.connect.js";
import dotenv from "dotenv";
import authRoute from "./Routers/auth.route.js"
import eventRoute from "./Routers/event.route.js";
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

dbconnect();

app.use("/auth", authRoute);
app.use("/event", eventRoute);

app.listen(process.env.PORT, (err)=>{
    if (err){
        console.error("App listen error: ", err);
    }
    console.log("server running on port:", process.env.PORT);
})
