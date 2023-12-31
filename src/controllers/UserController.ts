import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IUserController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

// ORM - Users Collection
import { getAllUsers, getUserById, deleteUserById, updateUserById, getAllKatasFromUsers } from '../domain/orm/User.orm';

@Route('/api/users')
@Tags("UserController")
export class UserController implements IUserController {

    /**
     * Endpoint to retreive  the user in the collection "Users" of DB
     * @param {string} id ID of user to  retreive (opcional)
     * @returns All users o user found by id
     */
    @Get('/')
    public async getUsers(@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Get User By Id: ${id}`);
            response = await getUserById(id)
        } else {

            LogSuccess(`[/api/users] Get All Users Request`)
            response = await getAllUsers(page, limit)
        }

        return response;
    }

    /**
     * Endpoint to delete the user in the collection "Users" of DB
     * @param {string} id ID of user to delete (opcional)
     * @returns Message information if deletion was correct
     */
    @Delete('/')
    public async deleteUser(@Query() id?: string): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Delete User By Id: ${id}`);
            await deleteUserById(id).then((r) => {
                response = {
                    message: `User id ${id} deleted successfully!`
                }
            })
        } else {

            LogWarning(`[/api/users] Delete Users WITHOUT ID`)
            response = {
                message: `Please, provide an ID to remove from database`
            }
        }

        return response;
    }

    /**
     * Endpoint to create the user in the collection "Users" of DB
     * @param user Create New User
     * @returns Message information if deletion was correct
     */
    @Put('/')
    public async updateUser(@Query() id: string, user: any): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Update User By Id: ${id}`);
            await updateUserById(id, user).then((r) => {
                response = {
                    message: `User with Id ${id} updated successfully!`
                }
            })
        } else {

            LogWarning(`[/api/users] Update Users WITHOUT ID`)
            response = {
                message: `Please, provide an ID to updating an existing user`
            }
        }

        return response;
    }

    @Get('/katas')
    public async getKatas(@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users/katas] Get Katas from User By Id: ${id}`);
            response = await getAllKatasFromUsers(page, limit, id)
        } else {
            response = {
                message: `ID from user needed`
            }
        }

        return response;
    }
}
