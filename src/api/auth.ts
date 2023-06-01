import axios, { AxiosResponse } from "axios";
import { Auth } from "../interfaces/auth";

export const login = async (email: string, password: string): Promise<AxiosResponse<Auth>> => {
    const url = import.meta.env.VITE_API_URL_LOGIN
    try {
        const auth = await axios.post(url, { email, password });
        return auth
    } catch (err: any) {
        throw err
    }
}