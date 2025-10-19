import express from "express"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js"

import cors from "cors"
const app=express();
app.use(express.json())
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://localhost:3000",
        methods:['GET', 'POST','PUT','DELETE'],
        credentials: true
    }
))  

app.use("/auth",authRoutes); 

export default app;  