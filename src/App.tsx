import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Accounts } from './pages';
import { Menu } from './layout';
import { useGlobalState } from './store/Provider';
function App() {
    const [state, dispatch] = useGlobalState();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/accounts" element={<Menu>{<Accounts />}</Menu>}></Route>
                <Route path="/" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
