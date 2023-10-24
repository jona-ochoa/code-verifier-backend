import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

import { registerUser, loginUser, logoutUser } from '../domain/orm/Auth.orm';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';
import { userEntity } from '@/domain/entities/User.entity';

@Route('/api/auth')
@Tags("AuthController")

export class AuthController implements IAuthController {
    @Post('/register')
    public async registerUser(user: IUser): Promise<any> {
        let response: any = '';
        if (user) {
            LogSuccess(`[/api/auth/register] Register New User: ${user}`);
            await registerUser(user).then((r) => {
                response = {
                    message: `User Created successfully: ${user.name}`
                }
            })
        } else {

            LogWarning(`[/api/auth/register] Register needds User Entity`)
            response = {
                message: `Please, provide a User Entity to create one`
            }
        }

        return response;
    }

    @Post('/login')
    public async loginUser(auth: IAuth): Promise<any> {
        let response: any = '';
        if (auth) {
            LogSuccess(`[/api/auth/login] Login User : ${auth.email}`);
            await loginUser(auth).then((r) => {
                response = {
                    massage: `Login User with Id ${auth}, successfully!`,
                    token: r.token
                }
            })
        } else {
            LogWarning(`[/api/auth/login] Login needs Auth Entity (email & password)`)
            response = {
                message: `Please, provide email & password to login.`
            }
        }

        return response;
    }

    @Post('/logout')
    public async logoutUser(): Promise<any> {
        let response: any = '';

    }
}

