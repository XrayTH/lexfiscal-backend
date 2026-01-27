import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDB from "../config/database.js"
import Tribute from "../models/Tribute.js"

dotenv.config()

const tributesData=[
  {
    name:"Impuesto sobre la Renta",
    slug:"ISR",
    type:"directo",
    scope:"nacional",
    validity:{
      status:"activo",
      startYear:1989,
      endYear:null
    },
    legalBasis:{
      name:"Estatuto Tributario",
      article:"Artículos 26 al 29",
      description:"Define la determinación de la renta líquida gravable"
    },
    technicalSheet:{
      definition:"Tributo que grava los ingresos obtenidos por personas naturales y jurídicas susceptibles de incrementar el patrimonio",
      taxableEvent:"Obtención de ingresos durante el periodo gravable",
      subjects:{
        active:"Estado colombiano",
        passive:"Personas naturales y jurídicas contribuyentes"
      },
      taxBase:"Renta líquida gravable",
      rate:"Progresiva según tipo de contribuyente"
    }
  },
  {
    name:"Impuesto sobre las Ventas",
    slug:"IVA",
    type:"indirecto",
    scope:"nacional",
    validity:{
        status:"activo",
        startYear:1983,
        endYear:null
    },
    legalBasis:{
        name:"Estatuto Tributario",
        article:"Artículos 420 al 512",
        description:"Regula el impuesto sobre la venta de bienes y la prestación de servicios"
    },
    technicalSheet:{
        definition:"Tributo indirecto que grava la venta de bienes, la prestación de servicios y la importación",
        taxableEvent:"Venta de bienes, prestación de servicios o importación",
        subjects:{
        active:"Estado colombiano",
        passive:"Consumidores finales"
        },
        taxBase:"Valor de la operación",
        rate:"General del 19% con tarifas diferenciales"
    }
    },
    {
        name:"Impuesto de Industria y Comercio",
        slug:"ICA",
        type:"directo",
        scope:"municipal",
        validity:{
            status:"activo",
            startYear:1913,
            endYear:null
        },
        legalBasis:{
            name:"Ley 14 de 1983",
            article:"Artículos 32 al 38",
            description:"Establece el impuesto sobre actividades industriales, comerciales y de servicios"
        },
        technicalSheet:{
            definition:"Tributo que grava el ejercicio de actividades industriales, comerciales o de servicios en un municipio",
            taxableEvent:"Realización habitual de actividades económicas",
            subjects:{
            active:"Municipio o distrito",
            passive:"Personas naturales o jurídicas que ejercen la actividad"
            },
            taxBase:"Ingresos brutos",
            rate:"Variable según municipio y actividad"
        }
    },
    {
        name:"Retención en la Fuente",
        slug:"Retefuente",
        type:"directo",
        scope:"nacional",
        validity:{
            status:"activo",
            startYear:1961,
            endYear:null
        },
        legalBasis:{
            name:"Estatuto Tributario",
            article:"Artículos 365 al 401",
            description:"Mecanismo de recaudo anticipado del impuesto"
        },
        technicalSheet:{
            definition:"Mecanismo mediante el cual se recauda de forma anticipada un impuesto",
            taxableEvent:"Pago o abono en cuenta sujeto a retención",
            subjects:{
            active:"Estado colombiano",
            passive:"Contribuyentes sujetos a retención"
            },
            taxBase:"Valor del pago o abono en cuenta",
            rate:"Variable según concepto y tipo de contribuyente"
        }
    }
]

const seedTributes=async()=>{
  try{
    await connectDB()

    console.log("Seeding tributes...")

    await Tribute.deleteMany()
    await Tribute.insertMany(tributesData)

    console.log("Seed completed successfully")
    process.exit(0)
  }catch(error){
    console.error("Seed error:",error.message)
    process.exit(1)
  }
}

seedTributes()
