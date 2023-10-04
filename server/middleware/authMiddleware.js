let jwt = require('jsonwebtoken');

let verifyToken=(req,res,next)=>{
    try{
        let token=req.header('Authorization');
        if(!token) return res.status(401).json({error:"Unauthorized"});

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }
        
        let verified=jwt.verify(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
    }
    catch(error){
        res.status(401).json({error:error.message});
    } 
}

module.exports={verifyToken};