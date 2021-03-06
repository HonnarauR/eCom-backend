const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1];
        const decoded=jwt.verify(token,"JWT_HR_SECRET_KEY")
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message : "auth failed"
        })
    }
}

