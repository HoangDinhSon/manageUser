import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Accounts,EditUser } from './pages';
import { Menu } from './layout';
import { useGlobalState } from './store/Provider';
function App() {
    const [state, dispatch] = useGlobalState();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/accounts" element={<Menu>{<Accounts />}</Menu>}></Route>
                <Route path="/accounts/edit" element={<Menu>{<EditUser />}</Menu>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
