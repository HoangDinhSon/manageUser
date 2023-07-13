import { RowHeader, RowBody } from '..';
import { typeOfListTodo } from '~/data/type/typeGlobal';
import { useLocation } from 'react-router-dom';
import * as LINK_PAGE from '~/data/constance_for_page';
import { useMemo, useEffect } from 'react';

type typeProps = {
    listTodo: typeOfListTodo;
    refetch: any;
};
export const KIND_OF_DEFAULT = '*';
function TableForNewApi({ listTodo, refetch }: typeProps) {
    let kindOfElement = KIND_OF_DEFAULT;
    const location = useLocation();
    const pathName = location.pathname;
    if (pathName.includes(LINK_PAGE.LINK_PAGE_STACKS)) {
        kindOfElement = LINK_PAGE.LINK_PAGE_STACKS;
    }
    if (pathName.includes(LINK_PAGE.LINK_PAGE_REPORT)) {
        kindOfElement = LINK_PAGE.LINK_PAGE_REPORT;
    }
    if (pathName.includes(LINK_PAGE.LINK_PAGE_PROJECT)) {
        kindOfElement = LINK_PAGE.LINK_PAGE_PROJECT;
    }
    if (kindOfElement === KIND_OF_DEFAULT) {
        useEffect(() => {
            console.log('you need update case at Table >>>');
        },[]);
    }

    return (
        <div>
            {!!listTodo && (
                <table className="w-full">
                    <thead>
                        <RowHeader />
                    </thead>
                    <tbody>
                        {listTodo.map((element, index) => {
                            return (
                                <RowBody
                                    key={index}
                                    eachTodo={element}
                                    index={index}
                                    refetch={refetch}
                                    kindOfElement={kindOfElement}
                                />
                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TableForNewApi;
