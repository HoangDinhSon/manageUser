import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Accounts } from './pages';
import { Menu } from './layout';
import { createContext } from 'react';
const value = {
    getRowPerPage: (payload: any) => {
        console.log(payload);
    },
};
 const ContextForApp = createContext(value);
const ProviderContext = ContextForApp.Provider;

function App() {
    return (
        <ProviderContext value={value}>
            <BrowserRouter>
                <Routes>
                    <Route path="/accounts" element={<Menu>{<Accounts />}</Menu>}></Route>
                    <Route path="/" element={<Login />}></Route>
                </Routes>
            </BrowserRouter>
        </ProviderContext>
    );
}
export {ContextForApp}
export default App;
