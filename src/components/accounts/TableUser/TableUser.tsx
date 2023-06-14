import { TableContainer, TableBody, TableHead, TableRow, TableCell, Table, Checkbox } from '@mui/material';
import { iconArrowTable } from '../../../assets/icon';
import PaginationTable from './PaginationTable';
import { ContextState } from '../../../store';

function TableCellHeader({ content, children, width }: any) {
    return (
        <TableCell
            sx={{
                '&.MuiTableCell-root': {
                    padding: '16px 12px  18px ',
                    width: { width },
                    color: '#D2D2D2',
                    outline: '0.2px solid #D2D2D2',
                },
            }}
        >
            <div className="flex justify-between">
                <span>{content}</span> <img src={iconArrowTable} alt="" />
                {children}
            </div>
        </TableCell>
    );
}
function TableRowHead() {
    return (
        <TableRow>
            <TableCell
                sx={{
                    '&.MuiTableCell-root': {
                        padding: '16px 12px  18px ',
                        width: '44px',
                        color: '#D2D2D2',
                        outline: '1px solid #D2D2D2',
                    },
                }}
            >
                <Checkbox sx={{ height: '24px', width: '24px' }} />
            </TableCell>
            <TableCellHeader content={'ID'} width="50px" />
            <TableCellHeader content={'First Name'} />
            <TableCellHeader content={'Alias'} />
            <TableCellHeader content={'Email'} />
            <TableCellHeader content={'Team'} />
            <TableCellHeader content={'Company'} />
            <TableCellHeader content={'Position'} />
            <TableCellHeader content={'Role'} />
            <TableCellHeader content={'Status'} />
            <TableCellHeader content={'Action'} />
        </TableRow>
    );
}
function TableCellBody({ content, width }: any) {
    return (
        <TableCell
            sx={{
                '&.MuiTableCell-root': {
                    padding: '16px 12px  18px ',
                    width: { width },
                    // color: '#0E1728',
                    outline: '0.5px solid #D2D2D2',
                },
            }}
        >
            {content}
        </TableCell>
    );
}
function TableRowBody({ user }: any) {
    return (
        <TableRow>
            <TableCell
                sx={{
                    '&.MuiTableCell-root': {
                        padding: '16px 12px  18px ',
                        width: '44px',
                        color: '#0E1728',
                        outline: '0.5px solid #D2D2D2',
                    },
                }}
            >
                <Checkbox sx={{ height: '24px', width: '24px' }} />
            </TableCell>
            <TableCellBody content={user?.id} width="110px" />
            <TableCellBody content={user?.firstName} width="118px" />
            <TableCellBody content={user?.alias} width="110px" />
            <TableCellBody content={user?.email} width="178px" />
            <TableCellBody content={user?.team} width="110px" />
            <TableCellBody content={user?.company.name} width="210px" />
            <TableCellBody content={user?.position} width="110px" />
            <TableCellBody content={user?.role} width="110px" />
            <TableCellBody content={user?.status} width="110px" />
            <TableCellBody content={user?.action} width="110px" />
        </TableRow>
    );
}

function TableUser() {
    const [state, dispatch] = ContextState.useGlobalState();
    const listUser = state.resApi.users;
    return (
        <div className='bg-white px-2'>
            <TableContainer
                sx={{
                    outline: '2px solid #D2D2D2',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRowHead />
                    </TableHead>
                    <TableBody>
                        {listUser?.map((element: any) => {
                            return <TableRowBody key={element.id} user={element} />;
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <PaginationTable />
        </div>
    );
}

export default TableUser;
