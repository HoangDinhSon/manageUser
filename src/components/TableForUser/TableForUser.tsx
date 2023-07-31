import { HeaderTable, RowBody, PaginationTable } from './component';
import { ContextTableProvider,  typeState } from './store_table/ContextTable';
import { Dispatch, SetStateAction } from 'react';

type Props = {
    listUser: any[];
    kindOfTable: 'all' | 'vinova' | 'partner';
    numberOfUser: number;
    setStateGlobal: Dispatch<SetStateAction<typeState | undefined>>;
};

function TableForUser({ listUser, kindOfTable, numberOfUser, setStateGlobal }: Props) {
    return (
        <ContextTableProvider>
            <div className="w-full bg-[red]">
                <table className="w-full">
                    <thead>
                        <HeaderTable />
                    </thead>
                    <tbody>
                        {listUser.map((user, index) => {
                            return <RowBody user={user} key={index} />;
                        })}
                    </tbody>
                </table>
                <div className="w-[calc(100%-158px)] fixed bottom-[--mrForChild]">
                    <PaginationTable numberOfUser={numberOfUser} />
                </div>
            </div>
        </ContextTableProvider>
    );
}

export default TableForUser;
