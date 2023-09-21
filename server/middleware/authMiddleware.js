const jwt=require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        if(!token) return res.status(401).json({error:"Unauthorized"});

        if (token.startswith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }
        
        const verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
    }
    catch(error){
        res.status(401).json({error:error.message});
    } 
}

module.exports={verifyToken};