import express from "express"
import helmet from "helmet"
import rateLimiter from "./middlewares/rateLimit.js"
import healthRoutes from "./routes/health.routes.js"
import tributeRoutes from "./routes/tribute.routes.js"
import getFramework from "./routes/framework.routes.js"
import errorHandler from './middlewares/errorHandler.js';

const app=express()

app.use(helmet())
app.use(errorHandler)
app.use(express.json())

if(process.env.RATE_LIMIT_ENABLED==="true"){
  app.use(rateLimiter)
}

app.use("/api/v1",healthRoutes)
app.use("/api/v1",tributeRoutes)
app.use("/api/v1",getFramework)

export default app
