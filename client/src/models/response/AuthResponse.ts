import { IUser } from "../IUSER";

export interface AuthResponse {
    accessToken: string,
    resreshToken: string,
    user: IUser
}