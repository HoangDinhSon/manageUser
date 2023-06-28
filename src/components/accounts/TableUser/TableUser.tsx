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
    //UI 
    const classWhenDisplayAsideBar =
        'fixed bottom-[--mrForChild] left-0 ml-[98px] w-[calc(100vw-118px)]  transition-all duration-[--durationTableUser] bg-[white] px-[26px] rounded-b-[--borderForLayout] xs_max:px-0 xs_max:w-[calc(100%-8px)] xs_max:ml-[--heightNav] xs_max:bottom-[--margin4px]';
    const classWhenHiddenAsideBar =
        'fixed bottom-[--mrForChild] left-0 ml-[20px] w-[calc(100vw-40px)]  transition-all duration-[--durationTableUser] bg-[white] px-[26px]  rounded-b-[--borderForLayout] xs_max:px-0 xs_max:w-[calc(100vw-8px)] xs_max:ml-[--margin4px] xs_max:bottom-[--margin4px]';

    return (
        <div className="bg-[white] overflow-x-auto">
            <table className='w-full'>
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
