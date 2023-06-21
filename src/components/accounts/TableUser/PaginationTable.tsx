import { Select, MenuItem, Pagination } from '@mui/material';
import { actions, ContextState } from '../../../store';
import { DEFAULT_COUNT } from '../../../constance_for_page';

function PaginationTable() {
    const [state, dispatch] = ContextState.useGlobalState();
    let count = state.resApi.total ? Math.ceil(state.resApi.total / state.rowPerPage) : DEFAULT_COUNT;
    if (state.isDisplayFiler) {
        count = Math.ceil(state.listFilter.length / state.rowPerPage);
    }
    const handleRowPerPage = (e: any) => {
        dispatch(actions.getRowPerPage(e.target.value));
    };
    const handlePagination = (e: any, value: any) => {
        dispatch(actions.getOrdinalNumberPage(value));
    };

    return (
        <div className="h-[68px]  ">
            <div className="flex justify-between items-center h-[68px]">
                <div className="text-[#9DA7B9] ">Showing 1 to 10 of 32,316 entries</div>
                <div className="flex">
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
                        count={count}
                        page={state.ordinalNumberPage}
                        onChange={(e, value) => {
                            handlePagination(e, value);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default PaginationTable;
