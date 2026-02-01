import dotenv from "dotenv"
import mongoose from "mongoose"
import connectDB from "../config/database.js"
import Tribute from "../models/Tribute.js"

dotenv.config()

const tributesData=[
  //1 ISR
  {
    name:"Impuesto sobre la Renta",
    slug:"ISR",
    type:"directo",
    scope:"nacional",
    validity:{status:"activo",startYear:1989,endYear:null},
    legalBasis:{
      name:"Estatuto Tributario",
      article:"Artículos 26 al 29",
      description:"Define la determinación de la renta líquida gravable"
    },
    technicalSheet:{
      definition:"Tributo que grava los ingresos susceptibles de incrementar el patrimonio",
      taxableEvent:"Obtención de ingresos en el periodo gravable",
      subjects:{active:"Estado colombiano",passive:"Personas naturales y jurídicas"},
      taxBase:"Renta líquida gravable",
      rate:"Progresiva según el tipo de contribuyente"
    }
  },

  //2 IVA
  {
    name:"Impuesto sobre las Ventas",
    slug:"IVA",
    type:"indirecto",
    scope:"nacional",
    validity:{status:"activo",startYear:1983,endYear:null},
    legalBasis:{
      name:"Estatuto Tributario",
      article:"Artículos 420 al 512",
      description:"Regula la venta de bienes y prestación de servicios"
    },
    technicalSheet:{
      definition:"Tributo indirecto que grava ventas, servicios e importaciones",
      taxableEvent:"Venta de bienes o prestación de servicios gravados",
      subjects:{active:"Estado colombiano",passive:"Consumidor final"},
      taxBase:"Valor de la operación",
      rate:"19% con tarifas diferenciales"
    }
  },

  //3 ICA
  {
    name:"Impuesto de Industria y Comercio",
    slug:"ICA",
    type:"directo",
    scope:"municipal",
    validity:{status:"activo",startYear:1913,endYear:null},
    legalBasis:{
      name:"Ley 14 de 1983",
      article:"Artículos 32 al 38",
      description:"Regula actividades industriales, comerciales y de servicios"
    },
    technicalSheet:{
      definition:"Tributo municipal sobre actividades económicas",
      taxableEvent:"Ejecución habitual de actividades económicas",
      subjects:{active:"Municipio o distrito",passive:"Contribuyentes"},
      taxBase:"Ingresos brutos",
      rate:"Variable según municipio"
    }
  },

  //4 Retefuente
  {
    name:"Retención en la Fuente",
    slug:"Retefuente",
    type:"directo",
    scope:"nacional",
    validity:{status:"activo",startYear:1961,endYear:null},
    legalBasis:{
      name:"Estatuto Tributario",
      article:"Artículos 365 al 401",
      description:"Mecanismo de recaudo anticipado"
    },
    technicalSheet:{
      definition:"Recaudo anticipado de un impuesto",
      taxableEvent:"Pago o abono sujeto a retención",
      subjects:{active:"Estado colombiano",passive:"Contribuyentes"},
      taxBase:"Valor del pago",
      rate:"Variable según concepto"
    }
  },

  //5 GMF
  {
    name:"Gravamen a los Movimientos Financieros",
    slug:"GMF",
    type:"indirecto",
    scope:"nacional",
    validity:{status:"activo",startYear:1998,endYear:null},
    legalBasis:{
      name:"Estatuto Tributario",
      article:"Artículos 870 al 881",
      description:"Regula el impuesto 4x1000"
    },
    technicalSheet:{
      definition:"Tributo sobre transacciones financieras",
      taxableEvent:"Débitos en cuentas bancarias",
      subjects:{active:"Estado colombiano",passive:"Usuarios del sistema financiero"},
      taxBase:"Monto de la transacción",
      rate:"0.4%"
    }
  },

  //6 INC
  {
    name:"Impuesto Nacional al Consumo",
    slug:"INC",
    type:"indirecto",
    scope:"nacional",
    validity:{status:"activo",startYear:2013,endYear:null},
    legalBasis:{
      name:"Estatuto Tributario",
      article:"Artículos 512-1 al 512-22",
      description:"Regula el impuesto al consumo"
    },
    technicalSheet:{
      definition:"Impuesto sobre bienes y servicios específicos",
      taxableEvent:"Consumo de bienes gravados",
      subjects:{active:"Estado colombiano",passive:"Consumidor final"},
      taxBase:"Valor del bien o servicio",
      rate:"Tarifas variables"
    }
  },

  //7 Impuesto al Patrimonio
  {
    name:"Impuesto al Patrimonio",
    slug:"Patrimonio",
    type:"directo",
    scope:"nacional",
    validity:{status:"activo",startYear:2019,endYear:null},
    legalBasis:{
      name:"Ley 2010 de 2019",
      article:"Artículo 35",
      description:"Establece el impuesto al patrimonio"
    },
    technicalSheet:{
      definition:"Tributo sobre el valor del patrimonio",
      taxableEvent:"Posesión de patrimonio superior al umbral legal",
      subjects:{active:"Estado colombiano",passive:"Personas naturales"},
      taxBase:"Patrimonio líquido",
      rate:"Progresiva"
    }
  },

  //8 Impuesto Predial
  {
    name:"Impuesto Predial",
    slug:"Predial",
    type:"directo",
    scope:"municipal",
    validity:{status:"activo",startYear:1950,endYear:null},
    legalBasis:{
      name:"Ley 44 de 1990",
      article:"Artículos 1 al 9",
      description:"Regula el impuesto sobre bienes inmuebles"
    },
    technicalSheet:{
      definition:"Tributo sobre la propiedad inmueble",
      taxableEvent:"Tenencia de un inmueble",
      subjects:{active:"Municipio",passive:"Propietarios"},
      taxBase:"Avalúo catastral",
      rate:"Variable"
    }
  },

  //9 Impuesto de Timbre
  {
    name:"Impuesto de Timbre",
    slug:"Timbre",
    type:"indirecto",
    scope:"nacional",
    validity:{status:"activo",startYear:1974,endYear:null},
    legalBasis:{
      name:"Estatuto Tributario",
      article:"Artículos 514 al 554",
      description:"Regula documentos sujetos a timbre"
    },
    technicalSheet:{
      definition:"Impuesto sobre documentos y contratos",
      taxableEvent:"Otorgamiento de documentos gravados",
      subjects:{active:"Estado colombiano",passive:"Otorgantes"},
      taxBase:"Valor del documento",
      rate:"Tarifa legal vigente"
    }
  },

  //10 Impuesto de Vehículos
  {
    name:"Impuesto sobre Vehículos Automotores",
    slug:"Vehiculos",
    type:"directo",
    scope:"departamental",
    validity:{status:"activo",startYear:1999,endYear:null},
    legalBasis:{
      name:"Ley 488 de 1998",
      article:"Artículos 138 al 151",
      description:"Regula el impuesto vehicular"
    },
    technicalSheet:{
      definition:"Tributo sobre la propiedad de vehículos",
      taxableEvent:"Tenencia de vehículo automotor",
      subjects:{active:"Departamento",passive:"Propietarios"},
      taxBase:"Valor comercial",
      rate:"Escalonada"
    }
  },

  //11 Sobretasa a la Gasolina
  {
    name:"Sobretasa a la Gasolina",
    slug:"Gasolina",
    type:"indirecto",
    scope:"municipal",
    validity:{status:"activo",startYear:1993,endYear:null},
    legalBasis:{
      name:"Ley 86 de 1989",
      article:"Artículo 6",
      description:"Regula la sobretasa a combustibles"
    },
    technicalSheet:{
      definition:"Gravamen al consumo de gasolina",
      taxableEvent:"Venta de gasolina",
      subjects:{active:"Municipios",passive:"Consumidores"},
      taxBase:"Precio del combustible",
      rate:"Fija por galón"
    }
  },

  //12 Impuesto al Carbono
  {
    name:"Impuesto Nacional al Carbono",
    slug:"Carbono",
    type:"indirecto",
    scope:"nacional",
    validity:{status:"activo",startYear:2017,endYear:null},
    legalBasis:{
      name:"Ley 1819 de 2016",
      article:"Artículo 221",
      description:"Impuesto ambiental al carbono"
    },
    technicalSheet:{
      definition:"Tributo ambiental sobre combustibles fósiles",
      taxableEvent:"Venta o importación de combustibles",
      subjects:{active:"Estado colombiano",passive:"Productores e importadores"},
      taxBase:"Contenido de carbono",
      rate:"Tarifa por tonelada"
    }
  },

  //13 Impuesto de Alumbrado Público
  {
    name:"Impuesto de Alumbrado Público",
    slug:"Alumbrado",
    type:"directo",
    scope:"municipal",
    validity:{status:"activo",startYear:1915,endYear:null},
    legalBasis:{
      name:"Ley 97 de 1913",
      article:"Artículo 1",
      description:"Financia el servicio de alumbrado público"
    },
    technicalSheet:{
      definition:"Tributo para financiar alumbrado público",
      taxableEvent:"Uso del servicio",
      subjects:{active:"Municipio",passive:"Usuarios"},
      taxBase:"Consumo o tarifa fija",
      rate:"Definida localmente"
    }
  },

  //14 Impuesto de Registro
  {
    name:"Impuesto de Registro",
    slug:"Registro",
    type:"indirecto",
    scope:"departamental",
    validity:{status:"activo",startYear:1995,endYear:null},
    legalBasis:{
      name:"Ley 223 de 1995",
      article:"Artículos 226 al 237",
      description:"Regula el registro de actos jurídicos"
    },
    technicalSheet:{
      definition:"Impuesto sobre actos sujetos a registro",
      taxableEvent:"Inscripción en registros públicos",
      subjects:{active:"Departamentos",passive:"Otorgantes"},
      taxBase:"Valor del acto",
      rate:"Porcentual"
    }
  },

  //15 Impuesto a Licores
  {
    name:"Impuesto al Consumo de Licores",
    slug:"Licores",
    type:"indirecto",
    scope:"departamental",
    validity:{status:"activo",startYear:1983,endYear:null},
    legalBasis:{
      name:"Ley 14 de 1983",
      article:"Artículos 61 al 74",
      description:"Regula impuestos a licores"
    },
    technicalSheet:{
      definition:"Grava el consumo de bebidas alcohólicas",
      taxableEvent:"Venta o importación",
      subjects:{active:"Departamentos",passive:"Consumidores"},
      taxBase:"Grados alcoholimétricos",
      rate:"Por unidad"
    }
  },

  //16 Impuesto a Cigarrillos
  {
    name:"Impuesto al Consumo de Cigarrillos",
    slug:"Cigarrillos",
    type:"indirecto",
    scope:"departamental",
    validity:{status:"activo",startYear:1983,endYear:null},
    legalBasis:{
      name:"Ley 14 de 1983",
      article:"Artículos 75 al 87",
      description:"Regula impuestos al tabaco"
    },
    technicalSheet:{
      definition:"Grava el consumo de cigarrillos",
      taxableEvent:"Venta o importación",
      subjects:{active:"Departamentos",passive:"Consumidores"},
      taxBase:"Unidad de cajetilla",
      rate:"Tarifa fija"
    }
  },

  //17 Impuesto de Degüello
  {
    name:"Impuesto de Degüello",
    slug:"Deguello",
    type:"indirecto",
    scope:"municipal",
    validity:{status:"activo",startYear:1913,endYear:null},
    legalBasis:{
      name:"Ley 97 de 1913",
      article:"Artículo 1",
      description:"Grava el sacrificio de ganado"
    },
    technicalSheet:{
      definition:"Impuesto al sacrificio de ganado",
      taxableEvent:"Degüello de animales",
      subjects:{active:"Municipio",passive:"Productores"},
      taxBase:"Unidad animal",
      rate:"Fija"
    }
  },

  //18 Impuesto de Espectáculos Públicos
  {
    name:"Impuesto a Espectáculos Públicos",
    slug:"Espectaculos",
    type:"indirecto",
    scope:"municipal",
    validity:{status:"activo",startYear:1936,endYear:null},
    legalBasis:{
      name:"Ley 12 de 1932",
      article:"Artículo 7",
      description:"Regula eventos públicos"
    },
    technicalSheet:{
      definition:"Tributo sobre eventos públicos",
      taxableEvent:"Realización del espectáculo",
      subjects:{active:"Municipio",passive:"Organizadores"},
      taxBase:"Valor de boletería",
      rate:"Porcentual"
    }
  },

  //19 Impuesto de Publicidad Exterior
  {
    name:"Impuesto de Publicidad Exterior",
    slug:"Publicidad",
    type:"directo",
    scope:"municipal",
    validity:{status:"activo",startYear:1997,endYear:null},
    legalBasis:{
      name:"Ley 140 de 1994",
      article:"Artículo 1",
      description:"Regula publicidad exterior visual"
    },
    technicalSheet:{
      definition:"Tributo sobre avisos publicitarios",
      taxableEvent:"Instalación de publicidad",
      subjects:{active:"Municipio",passive:"Anunciantes"},
      taxBase:"Área del aviso",
      rate:"Tarifa local"
    }
  },

  //20 Impuesto de Delineación Urbana
  {
    name:"Impuesto de Delineación Urbana",
    slug:"Delineacion",
    type:"directo",
    scope:"municipal",
    validity:{status:"activo",startYear:1913,endYear:null},
    legalBasis:{
      name:"Ley 97 de 1913",
      article:"Artículo 1",
      description:"Regula construcciones urbanas"
    },
    technicalSheet:{
      definition:"Tributo sobre licencias de construcción",
      taxableEvent:"Expedición de licencia",
      subjects:{active:"Municipio",passive:"Constructores"},
      taxBase:"Presupuesto de obra",
      rate:"Porcentual"
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
