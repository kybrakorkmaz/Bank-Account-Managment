import jwt from "jsonwebtoken";

const JWT_SECRET = "dev-access-secret";
const verifyToken = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith("Bearer ")){
        return res.status(400).json({ message: "Missing or Invalid Token"});
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.client = decoded;
        next();
    }catch (error){
        return res.status(403).json({ message: "Token expired or invalid" });
    }
}

export {verifyToken};