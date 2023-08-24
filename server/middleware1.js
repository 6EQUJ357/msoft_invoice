let jwt = require("jsonwebtoken")
require("dotenv").config()

//.env
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

module.exports = (req,res,next)=>{
    try{
        let token = req.header("x-token")
        if(!token){
            return res.send({status:400, message:"token not found"})  
        }

        let decode = jwt.verify(token, JWT_SECRET_KEY)  
        req.user = decode.user
        next();
    }
    catch(err){
        console.log(err)
        return res.send({status:500, message:"internal server error line:9 in middleware"}) 
    }
}