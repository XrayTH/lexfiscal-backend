import dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import rateLimiter from "./middlewares/rateLimit.js"
import healthRoutes from "./routes/health.routes.js"
import tributeRoutes from "./routes/tribute.routes.js"
import getFramework from "./routes/framework.routes.js"
import errorHandler from './middlewares/errorHandler.js';
import cors from "cors"

const app=express()
dotenv.config()

app.use(helmet())
app.use(errorHandler)
app.use(express.json())
app.use(cors({
 origin:process.env.FRONTEND_URL,
 methods:["GET"]
}))

if(process.env.RATE_LIMIT_ENABLED==="true"){
  app.use(rateLimiter)
}

app.use("/api/v1",healthRoutes)
app.use("/api/v1",tributeRoutes)
app.use("/api/v1",getFramework)

export default app
