
import { useReducer } from 'react';
import reducer from './reducer';
import { initState } from './reducer';
import { createContext,useContext } from 'react';
let state ;
let dispatch:any;
const Context = createContext([state, dispatch]);

function ContextProvider({ children }: any) {
    const [state, dispatch] = useReducer(reducer, initState);
    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
}
const useGlobalState =()=>useContext(Context)

export default ContextProvider;
export { useGlobalState,ContextProvider};

/*
chức năng 1:ContextProvider : tạo gloabal state và provider cho con 
chức năng 2:useGlobalState trong component con lấy ra các global state 
cách thức hoạt dộng: kết hợp 2 hook useReducer và( useContext + creatContext)
B1 : ContextProvider :có chức năng ôm component APP and provider [state và dispatch] 
B2 : Consumer : trong mỗi compnent nào muốn dùng tới thì cần import useGlobalState sẽ trả về state và dispatch 

*/


