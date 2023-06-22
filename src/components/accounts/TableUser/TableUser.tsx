import PaginationTable from './PaginationTable';
import { ContextState } from '../../../store';
import { TableRowForHeader, TableRowForBody } from '../..';
import { checkNumberOFCriterialForFilter } from '../../../handlelogic';

function TableUser() {
    const [state, dispatch] = ContextState.useGlobalState();
    const listUser = state.resApi.users;
    const listUserOfFilter = [...state.listFilter];
    const rowPerPage = state.rowPerPage;
    const ordinalNumberPage = state.ordinalNumberPage;
    const listFilterPagination = listUserOfFilter.splice(rowPerPage * (ordinalNumberPage - 1), rowPerPage);
    const criterialWasChosen = checkNumberOFCriterialForFilter(state.criterialForFilter);
    const classWhenDisplayAsideBar =
        'fixed bottom-5 left-[98px] w-[calc(100vw-119px)] bg-white px-[26px] xs_max:px-0 xs_max:w-[calc(100vw-41px)] xs_max:left-[20px] xs_max:bottom-[--margin4px]';
    const classWhenHiddenAsideBar =
        'fixed bottom-5 left-[20px] w-[calc(100vw-41px)] bg-white px-[26px] xs_max:px-0 xs_max:bottom-[--margin4px]';

    return (
        <div className="bg-white overflow-x-auto">
            <table>
                <thead>
                    <TableRowForHeader />
                </thead>
                <tbody>
                    {criterialWasChosen === 0 &&
                        listUser?.map((user: any, index: number) => <TableRowForBody user={user} key={index} />)}
                    {criterialWasChosen !== 0 &&
                        listFilterPagination.map((user: any, index: number) => (
                            <TableRowForBody user={user} key={index} />
                        ))}
                    {criterialWasChosen === 0 && listUser.length === 0 && (
                        <tr>
                            <td colSpan={11} className="text-center">
                                WE HAVE NOT DATA
                            </td>
                        </tr>
                    )}
                    {criterialWasChosen !== 0 && !!(state.listFilter.length === 0) && (
                        <tr>
                            <td colSpan={11} className="text-center">
                                WE HAVE NOT DATA
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className={state.isDisplayAsideMenu ? classWhenDisplayAsideBar : classWhenHiddenAsideBar}>
                <PaginationTable />
            </div>
        </div>
    );
}

export default TableUser;
