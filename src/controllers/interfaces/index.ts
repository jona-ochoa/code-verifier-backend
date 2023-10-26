import { IKata } from "../../domain/interfaces/IKata.interface";
import { IUser } from "../../domain/interfaces/IUser.interface";
import { BasicResponse } from "../types";

export interface IHelloController{
    getMessage(name?:string): Promise<BasicResponse>
}

export interface IUserController{
    getUsers(page: number, limit: number, id?: string): Promise<any>

    getKatas(page: number, limit: number, id?: string): Promise<any>

    deleteUser(id?: string): Promise<any>

    updateUser(id: string, user: any): Promise<any>

}

export interface IAuthController{
    registerUser(user: IUser): Promise<any>
    loginUser(auth: any): Promise<any>
}

export interface IKataController{
    getKatas(page: number, limit: number, id?: string): Promise<any>

    createKata(kata: IKata): Promise<any>

    deleteKata(id?: string): Promise<any>

    updateKata(id: string, kata: IKata): Promise<any>
}
