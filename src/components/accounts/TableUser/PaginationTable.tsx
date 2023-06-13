import { Select, MenuItem, Pagination } from '@mui/material';
// import { ContextForApp } from '../../../App';
// import { useContext } from 'react';
// const value = useContext(ContextForApp)
// console.log(value);

const handleRowPerPage = (e: any) => {
    console.log('e', e.target.value);
};
const handlePagination = (e: any, value: any) => {
    console.log('handlePagination', value);
};

function PaginationTable() {
    return (
        <div className="flex justify-end items-center outline outline-1 outline-[red] fixed bottom-0 right-0">
            <Select
                value={5}
                sx={{
                    height: '36px',
                    width: '132px',
                    fontSize: '12px',
                }}
                onChange={(e) => handleRowPerPage(e)}
            >
                <MenuItem value={5}>5 row per page</MenuItem>
                <MenuItem value={10}>10 row per page</MenuItem>
                <MenuItem value={20}>15 row per page</MenuItem>
                <MenuItem value={30}>20 row per page</MenuItem>
            </Select>
            <Pagination
                variant="outlined"
                shape="rounded"
                count={10}
                onChange={(e, value) => {
                    handlePagination(e, value);
                }}
            />
        </div>
    );
}

export default PaginationTable;
