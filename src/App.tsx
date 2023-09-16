import { useRoutes } from 'react-router-dom';
import { Menu } from './layout';
import * as LINK_PAGE from './data/constance_for_page';
import { Fragment, Suspense, lazy } from 'react';
import { WatchTodoForm, EditAndAddTodoForm, Stack } from './pages';

const Login = lazy(() => import('~/pages/login/Login'));
const Accounts = lazy(() => import('~/pages/accounts/Accounts'));
const EditUser = lazy(() => import('~/pages/accounts/EditUser'));
const AddUser = lazy(() => import('~/pages/accounts/AddUser'));
const NotFount = lazy(() => import('~/pages/NotFount'));
const Report = lazy(() => import('~/pages/report/Report'));
const Project = lazy(() => import('~/pages/project/Project'));

function App() {
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
                },
                {
                    path: 'vinova',
                    element: (
                        <Menu>
                            <Accounts />
                        </Menu>
                    ),
                },
                {
                    path: 'partner',
                    element: (
                        <Menu>
                            <Accounts />
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
                {
                    path: 'add',
                    element: (
                        <Menu>
                            <AddUser />
                        </Menu>
                    ),
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
