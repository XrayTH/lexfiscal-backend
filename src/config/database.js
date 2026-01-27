import mongoose from "mongoose"

const connectDatabase=async()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI,{
      autoIndex:false
    })

    console.log("MongoDB connected")
  }catch(error){
    console.error("MongoDB connection error:",error.message)
    process.exit(1)
  }
}

export default connectDatabase
