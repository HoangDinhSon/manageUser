import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Accounts } from './pages';
import { Menu } from './layout';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/accounts" element={<Menu>{<Accounts/>}</Menu>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
