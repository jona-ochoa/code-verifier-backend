import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const secret = process.env.SECRET_KEY || 'MYSECRETKEY';

/**
 * 
 * @param {Request} req Original request previous middleware of verification JWT
 * @param {Response} res Response to verification JWT
 * @param {NextFunction} next Next function to be executed
 * @returns Errors of verification or Next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Check HEADER from Request "x-access-token"
    let token: any = req.headers['x-access-token']

    if(!token){
        return res.status(403).send({
            authenticationError: 'Failed to verify token',
            message: `Not authorized`
        })
    }

    jwt.verify(token, secret, (err: any, decoded: any) => {
        if(err){
            return res.status(500).send({
                authenticationError: 'JWT verification failed',
                message: `Failed to verify JWT in request`
            })
        }

        next();
    })
}
