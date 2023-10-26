import { kataEntity } from "../entities/Kata.entity";
import { LogError, LogSuccess } from "../../utils/logger";
import { IKata } from "../interfaces/IKata.interface";

/**
 * Method to obtain all Katas from collection "Katas" in mongodb
 */
export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        const kataModel = kataEntity();

        // Search all katas
        const katas: any[] = await kataModel.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .exec()

            const total = await kataModel.countDocuments();

            if (katas.length === 0) {
                throw new Error('Not Found Katas');
            }
    
            const totalPages = Math.ceil(total / limit);
            const currentPage = page;

            return {
                katas,
                totalPages,
                currentPage,
            };

    } catch (error) {
        LogError(`[ORM Error]: Getting All Katas: ${error}`)
    }
}

// Get Kata By Id
export const getKataById = async (id: string): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();

        return await kataModel.findById(id)

    } catch (error) {
        LogError(`[ORM Error]: Getting User By ID: ${error}`)
    }
}

// Delete Kata By Id
export const deleteKataById = async (id: string): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.deleteOne({ _id: id })
    } catch (error) {
        LogError(`[ORM Error]: Deleting Kata By ID: ${error}`)
    }
}

// Create new Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.create(kata);
    } catch (error) {
        LogError(`[ORM Error]: Creating New Kata: ${error}`)
    }
}

// Update Kata By Id
export const updateKataById = async (id: string, kata: IKata): Promise<any | undefined> => {
    try {
        let kataModel = kataEntity();
        return await kataModel.findByIdAndUpdate(id, kata)
    } catch (error) {
        LogError(`[ORM Error]: Updating Kata ${id}: ${error}`)
    }
}
