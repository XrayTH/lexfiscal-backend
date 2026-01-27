import rateLimit from "express-rate-limit"

const rateLimiter=rateLimit({
  windowMs:Number(process.env.RATE_LIMIT_WINDOW)||15*60*1000,
  max:process.env.RATE_LIMIT_MAX,
  standardHeaders:true,
  legacyHeaders:false
})

export default rateLimiter
