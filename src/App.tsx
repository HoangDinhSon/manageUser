import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Accounts, EditUser, AddUser } from './pages';
import { Menu } from './layout';
import { LINK_PAGE_ACCOUNT_EDIT, LINK_PAGE_ACCOUNT, LINK_PAGE_ACCOUNT_ADD } from './constance_for_page';

import { CircularProgress } from '@mui/material';
import { useGlobalState } from './store/Provider';
import { actions } from './store';
import { useQuery } from 'react-query';
import { getLimitAndSkipUser } from './Api/logTimeApi';
function App() {
    const [state, dispatch] = useGlobalState();
    // console.log('🚀 ~ file: Accounts.tsx:12 ~ Accounts ~ state:', state);
    let limit = state.rowPerPage;
    let skip = (state.ordinalNumberPage - 1) * state.rowPerPage;
    const { status } = useQuery({
        queryKey: ['getLimitAndSkip', limit, skip],
        queryFn: () => getLimitAndSkipUser(limit, skip),
        onSuccess: (res) => {
            dispatch(actions.upDateListUser(res));
        },
    });
    return (
        <div>
            {status === 'loading' && <CircularProgress disableShrink />}
            {status === 'error' && <div>error</div>}
            {status === 'success' && (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />}></Route>
                        <Route path={LINK_PAGE_ACCOUNT} element={<Menu>{<Accounts />}</Menu>}></Route>
                        <Route path={LINK_PAGE_ACCOUNT_EDIT} element={<Menu>{<EditUser />}</Menu>}></Route>
                        <Route path={LINK_PAGE_ACCOUNT_ADD} element={<Menu>{<AddUser />}</Menu>}></Route>
                    </Routes>
                </BrowserRouter>
            )}
        </div>
    );
}
export default App;
