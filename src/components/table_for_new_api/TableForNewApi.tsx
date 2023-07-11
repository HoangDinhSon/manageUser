import { RowHeader, RowBody } from '..';
import { typeOfListTodo } from '~/data/type/typeGlobal';
type typeProps = {
    listTodo: typeOfListTodo;
};

function TableForNewApi({ listTodo  }: typeProps) {
    return (
        <div>
            {!!listTodo && (
                <table className="w-full">
                    <thead>
                        <RowHeader />
                    </thead>
                    <tbody>
                        {listTodo.map((element, index) => {
                            return <RowBody key={index} eachTodo={element} index={index} />;
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default TableForNewApi;
