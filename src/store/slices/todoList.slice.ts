import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Task, CreateTask } from '../../interfaces/todoList';
import { createTask as createTaskAPI, loadToDoList as loadToDoListAPI, updateTask as updateTaskAPI, removeTask as removeTaskAPI, getChosenTask as getChosenTaskAPI } from '../../api/todo';

const initialState = {
    toDoList: [] as Task[],
    chosenTask: {} as Task
};

export const toDoListSlice = createSlice({
    name: 'toDoList',
    initialState,
    reducers: {
        setToDoList: (state, { payload }: PayloadAction<Task[]>) => {
            state.toDoList = payload
        },
        addTask: (state, { payload }: PayloadAction<Task>) => {
            state.toDoList = [
                ...state.toDoList,
                payload
            ]
        },
        deleteTask: (state, { payload }: PayloadAction<string>) => {
            state.toDoList = state.toDoList.filter(task => task._id !== payload)
        },
        setChosenTask: (state, { payload }: PayloadAction<Task>) => {
            state.chosenTask = { ...payload }
        },
        forgetChosenTask: (state) => {
            state.chosenTask = {} as Task
        },
    },
});

const actions = () => {
    const loadToDoList = createAsyncThunk(
        `${toDoListSlice.name}/loadToDoList`,
        async (_, { dispatch }) => {
            try {
                const response = await loadToDoListAPI()
                dispatch(toDoListSlice.actions.setToDoList(response.data));
                return response.data
            } catch (err) {
                // dispatch(alertActions.error(error)); TODO alerta de error
            }
        }
    );
    const getChosenTask= createAsyncThunk(
        `${toDoListSlice.name}/getChosenTask`,
        async (id:string, { dispatch }) => {
            try {
                const response = await getChosenTaskAPI(id)
                dispatch(toDoListSlice.actions.setChosenTask(response.data));
                return response.data
            } catch (err) {
                // dispatch(alertActions.error(error)); TODO alerta de error
            }
        }
    );
    const createTask = createAsyncThunk(
        `${toDoListSlice.name}/createTask`,
        async (task: CreateTask, { dispatch }) => {
            try {
                const response = await createTaskAPI(task)
                dispatch(toDoListSlice.actions.addTask(response.data));
                return response.data
            } catch (err) {
                // dispatch(alertActions.error(error)); TODO alerta de error
            }
        }
    );
    const updateTask = createAsyncThunk(
        `${toDoListSlice.name}/updateTask`,
        async (task: Task, { dispatch }) => {
            try {
                const response = await updateTaskAPI(task)
                if(response.status === 200) dispatch(loadToDoList());
            } catch (err) {
                // dispatch(alertActions.error(error)); TODO alerta de error
            }
        }
    );
    const removeTask = createAsyncThunk(
        `${toDoListSlice.name}/removeTask`,
        async (id: string, { dispatch }) => {
            try {
                const response = await removeTaskAPI(id)
                if(response.status === 200) dispatch(loadToDoList());
            } catch (err) {
                // dispatch(alertActions.error(error)); TODO alerta de error
            }
        }
    );
    return { createTask, loadToDoList, updateTask , removeTask, getChosenTask}
}

export const { setToDoList, addTask, deleteTask, forgetChosenTask } = toDoListSlice.actions;
export const { createTask, loadToDoList, updateTask, removeTask, getChosenTask } = actions();
export default toDoListSlice.reducer;