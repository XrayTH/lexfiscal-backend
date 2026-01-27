import mongoose from "mongoose"

const validitySchema=new mongoose.Schema({
  status:{
    type:String,
    enum:["activo","inactivo"],
    required:true
  },
  startYear:{
    type:Number,
    default:null
  },
  endYear:{
    type:Number,
    default:null
  }
},{_id:false})

const legalBasisSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  article:{
    type:String,
    required:true
  },
  description:{
    type:String,
    default:null
  }
},{_id:false})

const technicalSheetSchema=new mongoose.Schema({
  definition:{
    type:String,
    required:true
  },
  taxableEvent:{
    type:String,
    required:true
  },
  subjects:{
    active:{
      type:String,
      required:true
    },
    passive:{
      type:String,
      required:true
    }
  },
  taxBase:{
    type:String,
    required:true
  },
  rate:{
    type:String,
    required:true
  }
},{_id:false})

const tributeSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  slug:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true
  },
  type:{
    type:String,
    enum:["directo","indirecto"],
    required:true
  },
  scope:{
    type:String,
    default:"nacional"
  },
  validity:{
    type:validitySchema,
    required:true
  },
  legalBasis:{
    type:legalBasisSchema,
    required:true
  },
  technicalSheet:{
    type:technicalSheetSchema,
    required:true
  }
},{
  timestamps:true
})

export default mongoose.model("Tribute",tributeSchema)
