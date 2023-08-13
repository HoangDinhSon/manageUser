import { useRoutes } from 'react-router-dom';
// import { Login, Accounts, EditUser, AddUser, NotFount, Report, Project } from './pages';
// import { Login, Accounts, EditUser, AddUser, NotFount, Report, Project } from './pages';
import { Menu } from './layout';
import * as LINK_PAGE from './data/constance_for_page';
import { useGlobalState } from './store/Provider';
import { actions } from './store';
import { useQuery } from 'react-query';
import { getLimitAndSkipUser } from './api/log_time_api';
import { Fragment, useEffect, Suspense, lazy } from 'react';
import { WatchTodoForm, EditAndAddTodoForm, Stack } from './pages';
import * as CONST from '~/data/constance_for_page';

const Login = lazy(() => import('~/pages/login/Login'));
const Accounts = lazy(() => import('~/pages/accounts/Accounts'));
const EditUser = lazy(() => import('~/pages/accounts/EditUser'));
const AddUser = lazy(() => import('~/pages/accounts/AddUser'));
const NotFount = lazy(() => import('~/pages/NotFount'));
const Report = lazy(() => import('~/pages/report/Report'));
const Project = lazy(() => import('~/pages/project/Project'));

function App() {
    const [state, dispatch] = useGlobalState();
    const limit = state.rowPerPage;
    const skip = (state.ordinalNumberPage - 1) * state.rowPerPage;
    const childrenAddAndEditPageAccounts = [
        {
            path: 'add',
            element: (
                <Menu>
                    <AddUser />
                </Menu>
            ),
        },
        {
            path: 'edit',
            element: (
                <Menu>
                    <EditUser />
                </Menu>
            ),
        },
    ];
    const elements = useRoutes([
        {
            path: '*',
            element: <NotFount />,
        },
        {
            path: '/',
            element: <Login />,
        },
        {
            path: LINK_PAGE.LINK_PAGE_PROJECT,
            element: (
                <Menu>
                    <Project />
                </Menu>
            ),
        },
        {
            path: LINK_PAGE.LINK_PAGE_STACKS,
            element: (
                <Menu>
                    <Stack />
                </Menu>
            ),
        },
        {
            path: LINK_PAGE.LINK_PAGE_REPORT,
            element: (
                <Menu>
                    <Report />
                </Menu>
            ),
            children: [
                {
                    path: LINK_PAGE.LINK_REPORT_WATCH,
                    element: (
                        <Menu>
                            <WatchTodoForm />
                        </Menu>
                    ),
                },
                {
                    path: LINK_PAGE.LINK_REPORT_EDIT,
                    element: (
                        <Menu>
                            <EditAndAddTodoForm />
                        </Menu>
                    ),
                },
                {
                    path: 'add',
                    element: (
                        <Menu>
                            <EditAndAddTodoForm />
                        </Menu>
                    ),
                },
            ],
        },
        {
            path: LINK_PAGE.LINK_PAGE_ACCOUNT,
            children: [
                {
                    path: '',
                    element: (
                        <Menu>
                            <Accounts />
                        </Menu>
                    ),
                    children: childrenAddAndEditPageAccounts,
                },
                {
                    path: 'vinova',
                    element: (
                        <Menu>
                            <Accounts />
                        </Menu>
                    ),
                    children: childrenAddAndEditPageAccounts,
                },
                {
                    path: 'partner',
                    element: (
                        <Menu>
                            <Accounts />
                        </Menu>
                    ),
                    children: childrenAddAndEditPageAccounts,
                },
            ],
        },
    ]);
    return (
        <Fragment>
            <Suspense>{elements}</Suspense>
        </Fragment>
    );
}
export default App;
