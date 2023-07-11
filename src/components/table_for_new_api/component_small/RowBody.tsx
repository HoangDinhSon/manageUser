import { typeOfTodo } from '~/data/type/typeGlobal';
import { Link } from 'react-router-dom';
type typePropsOfRowBody = {
    eachTodo: typeOfTodo;
    index: number;
};

function RowBody({ eachTodo, index }: typePropsOfRowBody) {
    const handleWatch = () => {};
    const handleEdit = () => {};
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{eachTodo._id}</td>
            <td>{eachTodo.text}</td>
            <td>{eachTodo.author}</td>
            <td>{eachTodo.complete ? 'Done' : 'Not done'}</td>
            <td>{eachTodo.createdDate}</td>
            <td onClick={handleWatch} className="cursor-pointer"><Link to ={`${eachTodo._id}/watch`}>Watch</Link></td>
            <td onClick={handleEdit} className="cursor-pointer"><Link to = {`${eachTodo._id}/edit`}>Edit</Link></td>
        </tr>
    );
}

export default RowBody;
