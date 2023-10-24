import { IAuth } from "../interfaces/IAuth.interface"
import { IUser } from "../interfaces/IUser.interface"
import { userEntity } from "../entities/User.entity";
import { LogError } from "../../utils/logger";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register User
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.create(user);
    } catch(error){
        LogError(`[ORM Error]: Creating New User: ${error}`)
    }
}

// Login User
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        
        userModel.findOne({ email: auth.email }, (err: any, user: IUser) => {
            if(err){
                LogError(err);
            } 

            if(!user){
                LogError('No such user found');
            }

            let validPassword = bcrypt.compareSync(auth.password, user.password)

            if(!validPassword){
                // TODO ---> NOT AUTHORIZED (401)
            }

            let token = jwt.sign({ email: user.email }, 'SECRET', {
                expiresIn: "1h"
            })

            return token;

        })

    } catch(error){
        LogError(`[ORM Error]: Creating New User: ${error}`)
    }
}

// Logout User
export const logoutUser = async (): Promise<any | undefined> => {}
