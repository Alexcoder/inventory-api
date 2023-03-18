import jwt  from "jsonwebtoken";

const user = jwt.verify(token, process.env.JWT_SECRET)
console.log(token)

export const verifyToken =(req, res, next)=>{
    const token = request.headers.token.split("")[1];
    if(!user) res.status(500).json("Token does not exist")   
    next()
}

export const verifyUser =(req, res, next)=>{
        

}