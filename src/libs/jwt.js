import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn:"1d",
            },
            //5 devuelve el token al cliente
            (err, token) => {
                if(err) reject(err);
                resolve(token)
                
            }
        );
    });
}
