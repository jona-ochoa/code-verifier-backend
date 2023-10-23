import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";

/**
 * Method to obtain all Users from collection "Users" in mongodb
 */
export const GetAllUsers = async (): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        // Search all users
        return await userModel.find({
            isDelete: false
        })
    } catch (error) {
        LogError(`ORM Error]: ${error}`)
    }
}

// TODO 
// Get User By Id
// Get User By email
// Delete User By Id
// Create new User 
// Update User By Id