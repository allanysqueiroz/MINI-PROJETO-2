const allowed=['a fazer','em andamento','concluída'];

module.exports=(req,res,next)=>{
  const {titulo,status}=req.body||{};
  if((req.method==='POST'||req.method==='PUT')&&(!titulo||titulo.trim()===''))
    return res.status(400).json({error:'titulo obrigatório'});
  if(status && !allowed.includes(status))
    return res.status(400).json({error:'status inválido'});
  next();
};
