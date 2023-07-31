import { configureStore } from '@reduxjs/toolkit';
import reducerSlice from './reducer_redux';
import  reducerListUserSelect  from './list_user_is_selected';
export const store = configureStore({
    reducer: {
        manageAppTodo: reducerSlice,
        listUserIsSelect:reducerListUserSelect,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

