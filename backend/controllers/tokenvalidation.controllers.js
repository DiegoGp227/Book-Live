import jwt from "jsonwebtoken";
import dotenv from 'dotenv'; 

dotenv.config(); 

const SECRET_KEY = process.env.SECRET_KEY; 
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION; 

export const postToken= async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); 
        res.status(200).json({ message: "Token is valid" });
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}
