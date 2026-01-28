export const getFramework=(req,res)=>{
  res.status(200).json({
    country:"Colombia",
    legalSystem:"Sistema tributario colombiano",
    primarySources:[
      "Constitución Política de Colombia",
      "Estatuto Tributario",
      "Leyes tributarias",
      "Decretos reglamentarios"
    ],
    authority:[
      "DIAN",
      "Entidades territoriales"
    ],
    scope:"Informativo",
    disclaimer:"La información presentada es de carácter informativo y no constituye asesoría legal"
  })
}
