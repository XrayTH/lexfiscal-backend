import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./config/database.js"

dotenv.config()
connectDB()

const PORT=process.env.PORT||3000

app.listen(PORT,()=>{
  console.log(`LexFiscal API running on port ${PORT}`)
})
