export const healthCheck=(req,res)=>{
  res.status(200).json({
    status:"ok",
    service:"LexFiscal API",
    timestamp:new Date().toISOString()
  })
}
