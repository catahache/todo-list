import axios, { AxiosResponse } from "axios";
import { CreateTask, Task } from "../interfaces/todoList";

const idAPI = '4c2d959ff30b45c7b0c1d35a96995132'

export const loadToDoList = async () => {
    try {
        const response = await axios.get(`https://crudcrud.com/api/${idAPI}/todos`);
        return response
    } catch (err: any) {
        throw err
    }
}
export const createTask = async (newTask: CreateTask): Promise<AxiosResponse<Task>> => {
    try {
        const response = await axios.post(`https://crudcrud.com/api/${idAPI}/todos`, newTask);
        return response
    } catch (err: any) {
        throw err
    }
}
export const updateTask = async (taskUpdated: Task): Promise<AxiosResponse> => {
    const foo: CreateTask = {
        done: taskUpdated.done,
        priority: taskUpdated.priority,
        task: taskUpdated.task,
        user: taskUpdated.user,
        type: taskUpdated.type,
        subTasks: taskUpdated.subTasks
    } //TODO cambiar nombre
    const id = taskUpdated._id
    try {
        const response = await axios.put(`https://crudcrud.com/api/${idAPI}/todos/${id}`, foo);
        return response
    } catch (err: any) {
        throw err
    }
}
export const removeTask = async (id:string):Promise<AxiosResponse> =>{
    try {
        const response = await axios.delete(`https://crudcrud.com/api/${idAPI}/todos/${id}`);
        return response
    } catch (err: any) {
        throw err
    }
}
export const getChosenTask = async (id: string | null): Promise<AxiosResponse<Task>> => {
    try {
        const response = await axios.get(`https://crudcrud.com/api/${idAPI}/todos/${id}`);
        return response
    } catch (err: any) {
        throw err
    }
}