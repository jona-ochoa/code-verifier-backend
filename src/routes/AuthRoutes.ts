import express, { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import { AuthController } from '../controllers/AuthController';
import { verifyToken } from '../middlewares/verifyToken.middleware';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';

const authRoutes: Router = express.Router();
const controller: AuthController = new AuthController();

// Middleware para validar campos requeridos
function validateFields(req: Request, res: Response, next: Function) {
    const { name, email, age, password } = req.body;
    if (!name || !email || !age || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    next();
}

// Registro de usuario
authRoutes.post('/register', validateFields, async (req: Request, res: Response) => {
    const { name, email, age, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const newUser: IUser = { name, email, password: hashedPassword, age, katas: [] };

    try {
        const response = await controller.registerUser(newUser);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Inicio de sesión
authRoutes.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const auth: IAuth = { email, password };
        const response = await controller.loginUser(auth);
        res.status(200).json(response);
    } catch (error) {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Obtener datos del usuario
authRoutes.get('/me', verifyToken, async (req: Request, res: Response) => {
    const id: any = req.query.id;

    if (!id) {
        return res.status(401).json({ message: "You are not authorized" });
    }

    try {
        const response = await controller.userData(id);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

authRoutes.post('/logout', verifyToken, async (req: Request, res: Response) => {
    try {
      // Puedes realizar cualquier lógica necesaria para el logout aquí, como invalidar el token del usuario.
      // Por ejemplo, si utilizas JWT, podrías agregar el token a una lista de tokens inválidos.
  
      // Ejemplo:
      // const token = req.headers.authorization?.split(' ')[1]; // Obtén el token del encabezado
      // invalidarToken(token); // Implementa esta función según tus necesidades
  
      // Finaliza la sesión del usuario
      res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

export default authRoutes;
