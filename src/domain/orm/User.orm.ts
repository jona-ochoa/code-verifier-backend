import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";

/**
 * Method to obtain all Users from collection "Users" in mongodb
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        let response: any = {};

        // Search all users
        await userModel.find({ isDeleted: false }).then((users: IUser[]) => {
            response.users = users;
        });

        return response;

    } catch (error) {
        LogError(`[ORM Error]: Getting All Users: ${error}`)
    }
}

// Get User By Id
export const getUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        return await userModel.findById(id)

    } catch (error) {
        LogError(`[ORM Error]: Getting User By ID: ${error}`)
    }
}

// Delete User By Id
export const deleteUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.deleteOne({ _id: id })
    } catch (error) {
        LogError(`[ORM Error]: Deleting User By ID: ${error}`)
    }
}

// Create new User
export const createUser = async (user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.create(user);
    } catch(error){
        LogError(`[ORM Error]: Creating New User: ${error}`)
    }
}

// Update User By Id
export const updateUserById = async (id: string, user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.findByIdAndUpdate(id, user)
    } catch (error) {
        LogError(`[ORM Error]: Updating User ${id}: ${error}`)
    }
}
