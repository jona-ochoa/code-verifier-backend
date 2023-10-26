import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa';
import { IKataController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';

// ORM - Users Collection
import { getAllKatas, createKata, getKataById, deleteKataById, updateKataById } from '../domain/orm/Kata.orm';
import { IKata } from '@/domain/interfaces/IKata.interface';

@Route('/api/katas')
@Tags("KataController")
export class KatasController implements IKataController {
    /**
     * Endpoint to retreive  the kata in the collection "Katas" of DB
     * @param {string} id ID of kata to  retreive (opcional)
     * @returns All katas o kata found by id
     */
    @Get('/')
    public async getKatas(@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/users] Get Kata By Id: ${id}`);
            response = await getKataById(id)
        } else {

            LogSuccess(`[/api/katas] Get All Katas Request`)
            response = await getAllKatas(page, limit)
        }

        return response;
    }

    @Post('/')
    public async createKata(kata: IKata): Promise<any> {
        let response: any = '';
        if (kata) {
            LogSuccess(`[/api/katas] Create New kata: ${kata.name}`);
            await createKata(kata).then((r) => {
                response = {
                    message: `Kata Created successfully: ${kata.name}`
                }
            })
        } else {

            LogWarning(`[/api/katas] Needs Kata Entity`)
            response = {
                message: `Please, provide a Kata Entity to create one`
            }
        }

        return response;
    }

    /**
     * Endpoint to delete the kata in the collection "Katas" of DB
     * @param {string} id ID of kata to delete (opcional)
     * @returns Message information if deletion was correct
     */
    @Delete('/')
    public async deleteKata(id?: string | undefined): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/katas] Delete Kata By Id: ${id}`);
            await deleteKataById(id).then((r) => {
                response = {
                    message: `Kata id ${id} deleted successfully!`
                }
            })
        } else {

            LogWarning(`[/api/katas] Delete Katas WITHOUT ID`)
            response = {
                message: `Please, provide an ID to remove from database`
            }
        }
        return response;
    }

    /**
     * Endpoint to create the kata in the collection "Katas" of DB
     * @param kata Create New Kata
     * @returns Message information if deletion was correct
     */
    @Put('/')
    public async updateKata(@Query() id: string, kata: IKata): Promise<any> {
        let response: any = '';

        if (id) {
            LogSuccess(`[/api/katas] Update Kata By Id: ${id}`);
            await updateKataById(id, kata).then((r) => {
                response = {
                    message: `Kata with Id ${id} updated successfully!`
                }
            })
        } else {

            LogWarning(`[/api/katas] Update Katas WITHOUT ID`)
            response = {
                message: `Please, provide an ID to updating an existing kata`
            }
        }

        return response;
    }
}