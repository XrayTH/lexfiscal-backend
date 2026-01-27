import Tribute from "../models/Tribute.js"

export const getTributes=async(req,res,next)=>{
  try{
    const tributes=await Tribute.find()
      .select("name slug type scope validity legalBasis")
      .sort({name:1})

    res.status(200).json({
      count:tributes.length,
      data:tributes
    })
  }catch(error){
    next(error)
  }
}
