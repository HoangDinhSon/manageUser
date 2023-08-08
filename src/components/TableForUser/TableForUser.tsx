import { HeaderTable, RowBody, PaginationTable } from './component';
import { ContextTableProvider, typeOnChangePagination } from './store_table/ContextTable';
import * as type from '~/data/type';

type Props = {
    listUser: type.typeOfListUser;
    kindOfTable: 'all' | 'vinova' | 'partner';
    numberOfUser: number;
    handleOnChangePagination?: typeOnChangePagination; //optional
};

function TableForUser({ listUser, kindOfTable, numberOfUser, handleOnChangePagination }: Props) {
    return (
        <ContextTableProvider>
            <div className="w-full ">
                <table className="w-full">
                    <thead>
                        <HeaderTable listUser={listUser} />
                    </thead>
                    <tbody>
                        {listUser.map((user, index) => {
                            return <RowBody user={user} key={user.id} />;
                        })}
                    </tbody>
                </table>
                <div className="w-[calc(100%-158px)] fixed bottom-[--mrForChild]">
                    <PaginationTable numberOfUser={numberOfUser} handleOnChangePagination={handleOnChangePagination} />
                </div>
            </div>
        </ContextTableProvider>
    );
}

export default TableForUser;
