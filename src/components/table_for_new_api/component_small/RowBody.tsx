import { typeOfTodo } from '~/data/type/typeGlobal';
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-hot-toast';
import { deleteTodo } from '~/api/log_time_api';
import { KIND_OF_DEFAULT } from '../TableForNewApi';
import * as LINK_PAGE from '~/data/constance_for_page';
import { useGlobalState } from '~/store/Provider';
import { actions } from '~/store';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/app_redux/store';
import { displayFormVerify, updateValueFormVerify } from '~/app_redux/reducer_redux';
import { displayFormAddEdit, changeIdAndKindOfForm } from '~/app_redux/reducer_redux';
import * as CONST from '~/data/constance_for_page/constant_global';
import { useState, useRef, useEffect } from 'react';
import { handleErrorAxiosUseForReactQuery } from '~/custome_hook/handle_error';
type typePropsOfRowBody = {
    eachTodo: typeOfTodo;
    index: number;
    refetch: any;
    kindOfElement: string;
};

function RowBody({ eachTodo, index, refetch, kindOfElement }: typePropsOfRowBody) {
    const idRefDelete = useRef('');
    const dispatchOfRedux = useDispatch(); // dispatch of redux
    const [, dispatch] = useGlobalState(); // dispatch of hook react
    const { valueFormVerify } = useSelector((state: RootState) => state.manageAppTodo);
    let ContentForEdit: any = 'Unknow';
    let contentForADD: any = 'Unknow';
    let contentForWatch: any = 'Unknow';
    const handleWatch = (id: string) => {
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
    };
    const handleDelete = (id: string) => {
        dispatchOfRedux(displayFormVerify());
        idRefDelete.current=id
        // setIdDelete(id);
    };
    const handleAddForPageProjects = () => {
        // hiển thị form
        dispatchOfRedux(displayFormAddEdit());
    };
    const handleEditForPageProjects = (id: string) => {
        dispatchOfRedux(displayFormAddEdit());
        dispatchOfRedux(changeIdAndKindOfForm({ id: id, kindOfForm: 'edit' }));
    };
    const handleViewForPageProjects = (id: string) => {
        dispatchOfRedux(displayFormAddEdit());
        dispatchOfRedux(changeIdAndKindOfForm({ id: id, kindOfForm: CONST.VIEW }));
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
            ContentForEdit = <div onClick={() => handleEditForPageProjects(eachTodo._id)}>Edit</div>;
            contentForADD = <div onClick={handleAddForPageProjects}>Add</div>;
            contentForWatch = <div onClick={() => handleViewForPageProjects(eachTodo._id)}>View</div>;
            break;
        }
    }

    const { mutate } = useMutation({
        mutationFn: deleteTodo,
        onSuccess: () => {
            toast.success('Delete success');
            dispatchOfRedux(updateValueFormVerify(false));
            idRefDelete.current=""
            refetch();
        },
        onError: (error) => {
            handleErrorAxiosUseForReactQuery(error,'Whoops!! delete fail')
        },
    });

    /* delete only trigger when verify by user and idDelete.current truthy */
    useEffect(() => {
        if (!!idRefDelete.current && valueFormVerify) {
            mutate(idRefDelete.current);
            console.log('check id delete>>>', idRefDelete.current,valueFormVerify);
        }
    },[!!idRefDelete.current && valueFormVerify]);

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
RowBody Share with many page (), we distinguish follow var kindOfForm
các page :
        page :/report 
        page :/stack
        page :/project

*/
