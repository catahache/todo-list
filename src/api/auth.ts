import axios, { AxiosResponse } from "axios";
import { Auth } from "../interfaces/auth";

export const login = async (email: string, password: string): Promise<AxiosResponse<Auth>> => {
    try {
        const auth = await axios.post('https://dev-api.contender-logistics.draketechdev.ca/api/auth/login', { email, password });
        return auth
    } catch (err: any) {
        throw err
    }
}