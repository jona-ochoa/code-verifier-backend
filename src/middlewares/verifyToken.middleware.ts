import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const secret = process.env.SECRET_KEY;

// Estructura para almacenar tokens inválidos
const invalidTokens = new Set();

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // Check HEADER from Request "x-access-token"
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      authenticationError: 'Failed to verify token',
      message: `Not authorized`
    });
  }

  // Verificar si el token está en la lista de tokens inválidos
  if (invalidTokens.has(token)) {
    return res.status(401).send({
      authenticationError: 'Token is invalid',
      message: `Token has been revoked`
    });
  }

  jwt.verify(token, secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(500).send({
        authenticationError: 'JWT verification failed',
        message: `Failed to verify JWT in request`
      });
    }

    next();
  });
};
