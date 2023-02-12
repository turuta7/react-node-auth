import $api from "../http";
import { IUser } from "../models/IUSER";
import { AxiosResponse } from "axios";

export default class UserService {
    static  fetchUsers():Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
   
}