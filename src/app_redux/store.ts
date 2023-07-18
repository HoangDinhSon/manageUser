import { configureStore } from '@reduxjs/toolkit';
import reducerSlice from "./reducer_redux"
export const store = configureStore({
    reducer: {
        manageAppTodo:reducerSlice
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/* 
tạo ra store 

*/
