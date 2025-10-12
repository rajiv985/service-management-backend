import express from "express"
import authRoutes from "./routes/auth.routes.js"
import serviceRoutes from "./routes/service.routes.js";
import cors from "cors"
const app=express();
app.use(express.json())
app.use(cors(
    {
        origin: "http://localhost:3000",
        methods:['GET', 'POST','PUT','DELETE'],
        credentials: true
    }
))  

app.use("/auth",authRoutes); 
app.use("/service",serviceRoutes);

export default app;  