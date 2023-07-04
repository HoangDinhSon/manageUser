import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Accounts, EditUser, AddUser } from './pages';
import { Menu } from './layout';
import * as LINK_PAGE from  './data/constance_for_page';
import { useGlobalState } from './store/Provider';
import { actions } from './store';
import { useQuery } from 'react-query';
import { getLimitAndSkipUser } from './Api/logTimeApi';
import { Fragment } from 'react';

function App() {
    const [state, dispatch] = useGlobalState();
    let limit = state.rowPerPage;
    let skip = (state.ordinalNumberPage - 1) * state.rowPerPage;
    const { status } = useQuery({
        queryKey: ['getLimitAndSkip', limit, skip],
        queryFn: () => getLimitAndSkipUser(limit, skip),
        onSuccess: (res) => {
            dispatch(actions.upDateListUser(res));
        },
        keepPreviousData: true,
    });
    return (
        <Fragment>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />}></Route>
                        <Route
                            path={LINK_PAGE.LINK_PAGE_ACCOUNT}
                            element={
                                <Menu>
                                    <Accounts status={status} />
                                </Menu>
                            }
                        ></Route>
                        <Route path={LINK_PAGE.LINK_PAGE_ACCOUNT_EDIT} element={<Menu>{<EditUser />}</Menu>}></Route>
                        <Route path={LINK_PAGE.LINK_PAGE_ACCOUNT_ADD} element={<Menu>{<AddUser />}</Menu>}></Route>
                    </Routes>
                </BrowserRouter>
        </Fragment>
    );
}
export default App;
