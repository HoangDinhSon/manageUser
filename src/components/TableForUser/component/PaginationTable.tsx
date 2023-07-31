import { Select, MenuItem, Pagination, PaginationItem, useMediaQuery, useTheme } from '@mui/material';
import { useContextTable, typeState, DEFAULT_ROW_PER_PAGE } from '../store_table/ContextTable';


type typeOFProps = {
    numberOfUser: number;
   
};
function PaginationTable({ numberOfUser }: typeOFProps) {
    const {stateOfTable, setStateTable} = useContextTable();
    // numberOfPage count:
    const count = Math.ceil(numberOfUser / stateOfTable.rowPerPage);
    const handleRowPerPage = (e: any) => {
        setStateTable((prev: typeState) => ({ ...prev, rowPerPage: parseInt(e.target.value) }));
    };
    const handlePagination = (e: any, value: any) => {
        setStateTable((prev: typeState) => ({ ...prev, ordinalPage: parseInt(value) }));
    };
    const theme = useTheme();
    const matchWidthSmMax = useMediaQuery(theme.breakpoints.down(641));
    return (
        <div className="flex justify-between items-center h-[68px] md_max:justify-center border-t-[length:--borderWidth]">
            <div className="text-[#9DA7B9] md_max:hidden ">Showing 1 to 10 of 32,316 entries</div>
            <div className="flex items-center ">
                <Select
                    value={stateOfTable.rowPerPage}
                    sx={{
                        height: '36px',
                        width: '132px',
                        fontSize: '12px',
                    }}
                    onChange={(e) => handleRowPerPage(e)}
                >
                    <MenuItem value={DEFAULT_ROW_PER_PAGE} sx={{ fontSize: '12px' }}>
                        5 row per page
                    </MenuItem>
                    <MenuItem value={10} sx={{ fontSize: '12px' }}>
                        10 row per page
                    </MenuItem>
                    <MenuItem value={15} sx={{ fontSize: '12px' }}>
                        15 row per page
                    </MenuItem>
                    <MenuItem value={20} sx={{ fontSize: '12px' }}>
                        20 row per page
                    </MenuItem>
                </Select>
                <Pagination
                    sx={{
                        outline: '1px solid var(--outlineColor)',
                        marginLeft: '5px',
                        borderRadius: '5px',
                    }}
                    variant="outlined"
                    shape="rounded"
                    siblingCount={matchWidthSmMax ? 0 : 1}
                    boundaryCount={0}
                    count={count} //numberOfUser
                    page={stateOfTable.ordinalPage} //ok
                    onChange={(e, value) => {
                        handlePagination(e, value);
                    }} //ok
                    renderItem={(item) => (
                        <PaginationItem
                            sx={{
                                fontSize: '12px',
                                height: '36px',
                                padding: 0,
                                '&.MuiPaginationItem-root': {
                                    marginX: '0',
                                    border: '1px solid #EBEBEB',
                                    borderTop: 'none',
                                    borderBottom: 'none',
                                    borderRadius: '0px',
                                },
                                '&.Mui-selected': {
                                    backgroundColor: '#5E90F0',
                                    color: 'white',
                                },
                            }}
                            components={
                                !matchWidthSmMax
                                    ? {
                                          next: (props) => (
                                              <li {...props} className=" px-3">
                                                  Next
                                              </li>
                                          ),
                                          previous: (props) => (
                                              <li {...props} className="px-3">
                                                  Prev.
                                              </li>
                                          ),
                                      }
                                    : {}
                            }
                            {...item}
                        />
                    )}
                />
            </div>
        </div>
    );
}

export default PaginationTable;
