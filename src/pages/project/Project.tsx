import { Toaster, toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { displayFormVerify } from '~/app_redux/reducer_redux';
import { RootState } from '~/app_redux/store';
import { TableAnimation, TableForNewApi } from '../../components';
import { getTodo } from '../../Api/logTimeApi';
// import { EditAndAddForPageStack } from '..';
// import { useGlobalState } from '~/store/Provider';
import { EditAddViewForm } from '~/pages';
import { createTodoHandle } from '~/Api/logTimeApi';

import { NavAccount, SearchAndFilter } from '../../components';
// const conditionSend = {
//     verifyLengthList: false,
//     verify: false,
// };

function Project() {
    const { isDisplayFormAddEditViewPageProject, listTodoSendServer, valueFormVerify } = useSelector(
        (state: RootState) => state.manageAppTodo,
    );
    const dispatchOfRedux = useDispatch();
    // const [conditionSendToApi, setConditionSendToApi] = useState(conditionSend);
    // call api for table user
    const {
        status,
        data: dataTodo,
        refetch,
    } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodo,
        onError: () => {
            toast.error('Oh No fail try press F5 refresh');
        },
    });
    const handleOnClick = () => {
        // check xem trong mảng list trong redux có phần tử >1 hay không ;

        if (listTodoSendServer.length === 1) {
            toast.error('there is no todo in list');
        }
        if (listTodoSendServer.length > 1) {
            // hỏi người dùng có muốn update hay không .
            dispatchOfRedux(displayFormVerify());
        }

        // gửi lên ser ver
    };
    // if (valueFormVerify && listTodoSendServer.length > 1) {
    //     listTodoSendServer.map((element) => {
    //        const responseOfServer=  createTodoHandle(element);
    //        console.log('responsfrom appi add to do >>>', responseOfServer);
    //     });
    // }

    return (
        <section className="">
            <Toaster />
            {status === 'loading' && <TableAnimation />}
            {status === 'success' && (
                <div className="bg-white  rounded-[12px] px-8 pb-[68px] pt-8 xs_max:px-[--margin4px] xs_max:pt-4 ">
                    <NavAccount />
                    <div className="py-[25px]">
                        <button className="bg-[blue] w-full rounded-md text-white " onClick={handleOnClick}>
                            ADD TODO
                        </button>
                    </div>
                    <TableForNewApi listTodo={dataTodo} refetch={refetch} />
                    {isDisplayFormAddEditViewPageProject && <EditAddViewForm />}
                </div>
            )}
        </section>
    );
}

export default Project;
