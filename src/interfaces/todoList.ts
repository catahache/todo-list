export interface Task {
    type: string,
    task: string,
    priority: number,
    done: boolean,
    subTasks: string[],
    user: string,
    _id: string
}

export type CreateTask = Omit<Task, "_id">; 
