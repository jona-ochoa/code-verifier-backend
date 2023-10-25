import { IAuth } from "../interfaces/IAuth.interface"
import { IUser } from "../interfaces/IUser.interface"
import { userEntity } from "../entities/User.entity";
import { LogError } from "../../utils/logger";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

let secret = process.env.SECRET_KEY || 'MYSECRETKEY';

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.create(user);
    } catch (error) {
        LogError(`[ORM Error]: Creating New User: ${error}`)
    }
}

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        let userFound: IUser | undefined = undefined;
        let token = undefined;

        await userModel.findOne({ email: auth.email }).then((user: IUser) => {
            userFound = user;

        })
            .catch((error) => {
                LogError(`[Error Authentication]: Finding User Not Found`)
                throw new Error(`[Error Authentication]: Finding User By Email: ${error}`)
            })


        // Check if password is valid
        let validPassword = bcrypt.compareSync(auth.password, userFound!.password)

        if (!validPassword) {
            LogError(`[Error Authentication]: Password Not Valid`)
            throw new Error(`[Error Authentication]: Password Not Valid`)
        }

        token = jwt.sign({ email: userFound!.email }, secret, {
            expiresIn: "1h"
        })


        return {
            user: userFound,
            token: token
        };



    } catch (error) {
        LogError(`[ORM Error]: Creating New User: ${error}`)
    }
}

// Logout User
export const logoutUser = async (): Promise<any | undefined> => { }
