import { Select, MenuItem, Pagination, PaginationItem, useMediaQuery, useTheme } from '@mui/material';
import { actions, ContextState } from '../../../store';
import { DEFAULT_COUNT } from '../../../constance_for_page';
import { checkNumberOFCriterialForFilter } from '../../../handlelogic';
import { createTheme, ThemeProvider } from '@mui/material/styles';
function PaginationTable() {
    const [state, dispatch] = ContextState.useGlobalState();
    const criterialWasChosen = checkNumberOFCriterialForFilter(state.criterialForFilter);
    let count = state.resApi.total ? Math.ceil(state.resApi.total / state.rowPerPage) : DEFAULT_COUNT;
    if (criterialWasChosen != 0) {
        count = Math.ceil(state.listFilter.length / state.rowPerPage);
    }
    const handleRowPerPage = (e: any) => {
        dispatch(actions.getRowPerPage(e.target.value));
    };
    const handlePagination = (e: any, value: any) => {
        dispatch(actions.getOrdinalNumberPage(value));
    };
    const theme = useTheme();
    const matchWidthSmMax = useMediaQuery(theme.breakpoints.down(641));

    return (
            <div className="flex justify-between items-center h-[68px] md_max:justify-center">
                <div className="text-[#9DA7B9] md_max:hidden ">Showing 1 to 10 of 32,316 entries</div>
                <div className="flex items-center ">
                    <Select
                        value={state.rowPerPage}
                        sx={{
                            height: '36px',
                            width: '132px',
                            fontSize: '12px',
                        }}
                        onChange={(e) => handleRowPerPage(e)}
                    >
                        <MenuItem value={5} sx={{ fontSize: '12px' }}>
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
                        variant="outlined"
                        shape="rounded"
                        siblingCount={matchWidthSmMax ? 0 : 1}
                        boundaryCount={0}
                        count={count}
                        page={state.ordinalNumberPage}//ok
                        onChange={(e, value) => {
                            handlePagination(e, value);
                        }}//ok
                        renderItem={(item) => (<PaginationItem 
                            components={
                                !matchWidthSmMax
                                    ? {
                                          next: (props) => (
                                              <li {...props} className="text-xs">
                                                  Next
                                              </li>
                                          ),
                                          previous: (props) => (
                                              <li {...props} className="text-xs">
                                                  Previous
                                              </li>
                                          ),
                                      }
                                    : {}
                            }
                            {...item}
                        />)}
                    />
                </div>
            </div>
    );
}

export default PaginationTable;
