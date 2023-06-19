import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Accounts, EditUser } from './pages';
import { Menu } from './layout';
import { LINK_PAGE_ACCOUNT_EDIT,LINK_PAGE_ACCOUNT } from './constance_for_page';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path={LINK_PAGE_ACCOUNT} element={<Menu>{<Accounts />}</Menu>}></Route>
                <Route path={LINK_PAGE_ACCOUNT_EDIT} element={<Menu>{<EditUser />}</Menu>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
