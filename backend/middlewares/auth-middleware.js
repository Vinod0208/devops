import { JWT_SECRET } from "../config/utils.js";
import { HTTP_STATUS } from "../utils/constants.js";
import jwt from 'jsonwebtoken';

export const checkAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.x_access_token;
        if(authHeader){
            const token = authHeader.split(" ")[1]; 

            jwt.verify(token, JWT_SECRET, (error, payload) => {
                if(error){
                    return res.status(HTTP_STATUS.FORBIDDEN).json({
                        success: false,
                        message: error.message,
                    });
                }
                req.user = payload;
                next();
            });
            
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                message: "JWT Token is missing",
            });
        }
        
    } catch (error) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: error.message,
        });
    }
}
