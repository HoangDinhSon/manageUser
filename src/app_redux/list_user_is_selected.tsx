/* 
manage user whom is selected by click input type Check 
*/
import * as TYPE from '~/data/type';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

/* 1, default value */
const DEFAULT_LIST_USER_IS_SELECTED: TYPE.typeOfListUser = [];
/* 2, type */
interface typeInitialState {
    listUserIsSelected: TYPE.typeOfListUser;
}
/* 3, initial  */
const initialState: typeInitialState = {
    listUserIsSelected: DEFAULT_LIST_USER_IS_SELECTED,
};
/* 4, make reducer */
const reducerListUserSelect = createSlice({
    name: 'listUserIsSelect',
    initialState: initialState,
    reducers: {
        addOneUser: (state, actions: PayloadAction<TYPE.typeUserAfterCallApiBaseOnID>) => {
            state.listUserIsSelected.push(actions.payload);
        },
        removeOneUser:(state, actions:PayloadAction<TYPE.typeUserAfterCallApiBaseOnID>)=>{
            if(state.listUserIsSelected.length>0){
                const newListAfterRemove= state.listUserIsSelected.filter((user)=>{
                    if (user.id===actions.payload.id){
                        return false;
                    }
                    return true
                })
                state.listUserIsSelected=[...newListAfterRemove]
            }
        }
    },
});
export const { addOneUser,removeOneUser } = reducerListUserSelect.actions;
export default reducerListUserSelect.reducer;
