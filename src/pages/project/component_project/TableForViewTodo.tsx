import { typeOfTodo } from '~/data/type/typeGlobal';
import {  useDispatch } from 'react-redux';
import { deleteOneTodo } from '~/app_redux/reducer_redux';
type typeForm = Omit<typeOfTodo, '_id'>;
type propsTableRow = {
    ele: typeForm;
    index: number;
};

function TableRow({ ele, index }: propsTableRow) {
    const dispatchOfRedux = useDispatch();
    const handleDeleteTodo = (index: number) => {
        dispatchOfRedux(deleteOneTodo(index));
    };
    return (
        <>
            <td>{index}</td>
            <td>{ele.text}</td>
            <td>{ele.complete ? 'done' : 'not done'}</td>
            <td>{ele.author}</td>
            <td onClick={() => handleDeleteTodo(index)} className="cursor-pointer">
                Delete
            </td>
        </>
    );
}
function TableForViewTodo({ list }: any) {
    return (
        <table className="w-full">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Todo</th>
                    <th>Complete</th>
                    <th>Author</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {list.map((ele: any, index: number) => (
                    <tr key={index}>{!!index && <TableRow ele={ele} index={index} />}</tr>
                ))}
            </tbody>
        </table>
    );
}

export default TableForViewTodo;
