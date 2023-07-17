import { useRoutes } from 'react-router-dom';
import { Login, Accounts, EditUser, AddUser, NotFount, Report, Project } from './pages';
import { Menu } from './layout';
import * as LINK_PAGE from './data/constance_for_page';
import { useGlobalState } from './store/Provider';
import { actions } from './store';
import { useQuery } from 'react-query';
import { getLimitAndSkipUser } from './api/log_time_api';
import { Fragment, useEffect } from 'react';
import {  WatchTodoForm, EditAndAddTodoForm, Stack } from './pages';

function App() {
    const [state, dispatch] = useGlobalState();
    let limit = state.rowPerPage;
    let skip = (state.ordinalNumberPage - 1) * state.rowPerPage;
    const { status } = useQuery({
        queryKey: ['getLimitAndSkip', limit, skip],
        queryFn: () => getLimitAndSkipUser(limit, skip),
        onSuccess: (res) => {
            if (!!res) {
                dispatch(actions.upDateListUser(res));
            }
        },
        onError:()=>{
            console.log('only will have response from server >>>', 999);
        },
        keepPreviousData: true,
    });
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
            path: `${LINK_PAGE.LINK_PAGE_REPORT}`,
            element: (
                <Menu>
                    <Report />
                </Menu>
            ),
            children: [
                {
                    path: `${LINK_PAGE.LINK_REPORT_WATCH}`,
                    element: (
                        <Menu>
                            <WatchTodoForm />
                        </Menu>
                    ),
                },
                {
                    path: `${LINK_PAGE.LINK_REPORT_EDIT}`,
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
            element: (
                <Menu>
                    <Accounts status={status} />
                </Menu>
            ),
            children: [
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
            ],
        },
    ]);

    return <Fragment>{elements}</Fragment>;
}
export default App;
