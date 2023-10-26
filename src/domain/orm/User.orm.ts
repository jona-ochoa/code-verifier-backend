import { userEntity } from "../entities/User.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { kataEntity } from "../entities/Kata.entity";
import { IKata } from "../interfaces/IKata.interface";
import mongoose from 'mongoose';

/**
 * Method to obtain all Users from collection "Users" in mongodb
 */
export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();

        const users: IUser[] = await userModel.find()
            .select('name, email, age, katas')
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()

            const total = await userModel.countDocuments();

            if (users.length === 0) {
                throw new Error('Not Found Users');
            }
    
            const totalPages = Math.ceil(total / limit);
            const currentPage = page;

            return {
                users,
                totalPages,
                currentPage,
            };

    } catch (error) {
        LogError(`[ORM Error]: Getting All Katas: ${error}`)
    }
}

// Get User By Id
export const getUserById = async (id: string): Promise<any | undefined> => {
    try {
        let userModel = userEntity();

        return await userModel.findById(id).select('name email age katas')

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

// Update User By Id
export const updateUserById = async (id: string, user: any): Promise<any | undefined> => {
    try {
        let userModel = userEntity();
        return await userModel.findByIdAndUpdate(id, user)
    } catch (error) {
        LogError(`[ORM Error]: Updating User ${id}: ${error}`)
    }
}

export const getAllKatasFromUsers = async (page: number, limit: number, id: string): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity();
        let kataModel = kataEntity();

        let katasFound: IKata[] = []
        
        let response: any = {
            katas: []
        };

        console.log(`User ID ${id}`);
        

        // Search all users
        await userModel.findById(id).then(async (user: IUser) => {

            response.user = user.email;

            let objectIds: mongoose.Types.ObjectId[] = []
            user.katas.forEach((kataID: string) => {
                let objectID = new mongoose.Types.ObjectId(kataID)
                objectIds.push(objectID)
            })

            await kataModel.find({ _id: {"$in": objectIds} }).then((katas: IKata[]) => {

                katasFound = katas;

            })

        }).catch((error) => {
            console.log("[ORM Error]: Finding User by ID: ", error);
        })

        return response;

    } catch (error) {
        LogError(`[ORM Error]: Obtainig User: ${error}`)
    }
}
