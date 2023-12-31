import { Get, Route, Tags, Query, Delete, Post, Put, Request } from 'tsoa';
import { IAuthController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

import { registerUser, loginUser, logoutUser } from '../domain/orm/Auth.orm';
import { IUser } from '../domain/interfaces/IUser.interface';
import { IAuth } from '../domain/interfaces/IAuth.interface';
import { userEntity } from '../domain/entities/User.entity';
import { AuthResponse, ErrorResponse } from './types';
import { getUserById } from '../domain/orm/User.orm';

@Route('/api/auth')
@Tags("AuthController")

export class AuthController implements IAuthController {
    @Post('/register')
    public async registerUser(user: IUser): Promise<any> {
        let response: any = '';
        if (user) {
            LogSuccess(`[/api/auth/register] Register New User: ${user.name}`);
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

        let response: AuthResponse | ErrorResponse | undefined;

        if(auth) {
            LogSuccess(`[/api/auth/login] Login User : ${auth.email}`);
            let data = await loginUser(auth);
            response = {
                token: data.token,
                message: `Welcome, ${data.user.name}`
            }
        } else {
            LogWarning(`[/api/auth/login] Login needs Auth Entity (email & password)`)
            response = {
                message: `Please, provide email & password to login.`,
                error: '[AUTH ERROR]: email & password are needs'
            }
        }

        return response;
    }

      /**
     * Endpoint to retreive  the user in the collection "Users" of DB
     * Middleware Validate JWT
     * @param {string} id ID of user to  retreive (opcional)
     * @returns All users o user found by id
     */
      @Get('/me')
      public async userData(@Query() id: string): Promise<any> {
          let response: any = '';
  
          if (id) {
              LogSuccess(`[/api/users] Get User Data By Id: ${id}`);
              response = await getUserById(id)
          } 
  
          return response;
      }

      @Post('/logout')
      public async logoutUser(@Request() request: any): Promise<any> {
          try {
              // Aquí puedes eliminar el token del usuario desde el sistema de autenticación,
              // por ejemplo, si utilizas JWT, podrías invalidar el token.
      
              // Elimina el token del usuario
              // Esto es solo un ejemplo y depende de cómo estés gestionando la autenticación y los tokens
              // Puedes usar alguna librería de manejo de tokens o base de datos para realizar esto.
              // Ejemplo:
              // await removeUserToken(request.user.id);
      
              LogSuccess(`[/api/auth/logout] User Logged Out: ${request.user.email}`);
              return { message: 'User logged out successfully' };
          } catch (error) {
              LogError(`[/api/auth/logout] Error logging out: ${error}`);
              return { message: 'Error logging out' };
          }
      }   
}

