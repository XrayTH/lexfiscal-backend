import express from "express"
import helmet from "helmet"
import rateLimiter from "./middlewares/rateLimit.js"

const app=express()

app.use(helmet())
app.use(express.json())

if(process.env.RATE_LIMIT_ENABLED==="true"){
  app.use(rateLimiter)
}

export default app
