import PaginationTable from './PaginationTable';
import { ContextState } from '../../../store';
import { TableRowForHeader, TableRowForBody } from '../..';

function TableUser() {
    const [state, dispatch] = ContextState.useGlobalState();
    const listUser = state.resApi.users;
    const listUserOfFilter = [...state.listFilter];
    const rowPerPage = state.rowPerPage;
    const ordinalNumberPage = state.ordinalNumberPage;
    const listFilterPagination = listUserOfFilter.splice(rowPerPage * (ordinalNumberPage - 1), rowPerPage);
    return (
        <div className="bg-white overflow-x-auto ">
            <table>
                <thead>
                    <TableRowForHeader />
                </thead>
                <tbody>
                    {!state.isDisplayFiler &&
                        listUser?.map((user: any, index: number) => <TableRowForBody user={user} key={index} />)}
                    {state.isDisplayFiler &&
                        listFilterPagination.map((user: any, index: number) => (
                            <TableRowForBody user={user} key={index} />
                        ))}
                    {!state.isDisplayFiler && listUser.length === 0 && (
                        <tr>
                            <td colSpan={11} className="text-center">
                                WE HAVE NOT DATA
                            </td>
                        </tr>
                    )}
                    {state.isDisplayFiler && !!(state.listFilter.length === 0) && (
                        <tr>
                            <td colSpan={11} className="text-center">
                                WE HAVE NOT DATA
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='fixed bottom-5 w-[calc(100vw-104px)] bg-white px-[26px]'>
                <PaginationTable />
            </div>
        </div>
    );
}

export default TableUser;
