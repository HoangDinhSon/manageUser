import { typeOfTodo } from '~/data/type/typeGlobal';
import { Link, useLocation } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { deleteTodo } from '~/Api/logTimeApi';
import { KIND_OF_DEFAULT } from '../TableForNewApi';
import * as LINK_PAGE from '~/data/constance_for_page';
import { useGlobalState } from '~/store/Provider';
import { actions } from '~/store';
import { useSelector, useDispatch } from 'react-redux';
import { displayFormAddEdit, hiddenFormAddEdit } from '~/app_redux/reducer_redux';
type typePropsOfRowBody = {
    eachTodo: typeOfTodo;
    index: number;
    refetch: any;
    kindOfElement: string;
};

function RowBody({ eachTodo, index, refetch, kindOfElement }: typePropsOfRowBody) {
    const dispatchOfRedux = useDispatch();
    const [state, dispatch] = useGlobalState();
    let ContentForEdit: any = 'Không xác định ';
    let contentForADD: any = 'Không xác định ';
    let contentForWatch: any = ' không xác định ';
    const handleWatch = (id: string) => {
        // console.log('watch>>>', 999);
        dispatch(actions.toggleEditAddPageStack());
        dispatch(actions.getIdOfTodoPageStack(id));
        dispatch(actions.displayViewTodoStack());
    };
    const handleEdit = (id: string) => {
        dispatch(actions.toggleEditAddPageStack());
        dispatch(actions.getIdOfTodoPageStack(id));
    };
    const handleAdd = () => {
        dispatch(actions.toggleEditAddPageStack());
        // console.log('add>>>', 999);
    };
    const handleDelete = (id: string) => {
        mutate(id);
    };
    const handleAddForPageProjects = () => {
        // hiển thị form 
        dispatchOfRedux(displayFormAddEdit());
        // 
    };
    switch (kindOfElement) {
        case KIND_OF_DEFAULT: {
            console.log('check component Stack >>>');
            break;
        }
        case LINK_PAGE.LINK_PAGE_STACKS: {
            ContentForEdit = <div onClick={() => handleEdit(eachTodo._id)}>Edit</div>;
            contentForADD = <div onClick={handleAdd}>Add</div>;
            contentForWatch = <div onClick={() => handleWatch(eachTodo._id)}>Watch</div>;
            break;
        }
        case LINK_PAGE.LINK_PAGE_REPORT: {
            ContentForEdit = <Link to={`/report/${eachTodo._id}/edit`}>Edit</Link>;
            contentForADD = <Link to="/report/add">Add </Link>;
            contentForWatch = <Link to={`/report/${eachTodo._id}/watch`}>Watch</Link>;
            break;
        }
        case LINK_PAGE.LINK_PAGE_PROJECT: {
            ContentForEdit = 'Edit Project';
            contentForADD = <div onClick={handleAddForPageProjects}>Add project</div>;
            contentForWatch = 'Watch project';
            break;
        }
    }

    const { mutate } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            toast.success('delete success');
            refetch();
        },
        onError: () => {
            toast.error('delete fail');
        },
    });

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{eachTodo._id}</td>
            <td>{eachTodo.text}</td>
            <td>{eachTodo.author}</td>
            <td>{eachTodo.complete ? 'Done' : 'Not done'}</td>
            <td>{eachTodo.createdDate}</td>
            <td className="cursor-pointer">{contentForWatch}</td>
            <td className="cursor-pointer">{ContentForEdit}</td>
            <td className="cursor-pointer">{contentForADD}</td>
            <td onClick={() => handleDelete(eachTodo._id)} className="cursor-pointer">
                Delete
            </td>
        </tr>
    );
}

export default RowBody;
/* 
row body này dùng chung cho tất cả các page ==> nó có dạng nào tùy thuộc vào table truyền vào 
các page :
        page :/report 
        page :/stack
        page :/project

*/
