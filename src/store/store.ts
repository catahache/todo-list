import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth.slice';
import toDoListSlice  from './slices/todoList.slice';

const rootReducer = combineReducers({
  authData: authSlice,
  toDoData: toDoListSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;