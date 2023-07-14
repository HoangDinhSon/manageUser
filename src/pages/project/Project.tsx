import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { displayFormVerify } from '~/app_redux/reducer_redux';
import { RootState } from '~/app_redux/store';
import { TableAnimation, TableForNewApi, NavAccount } from '../../components';
import { EditAddViewFormPageProject } from '~/pages';
import { useGetData, createTodoHandle, updateTodoForPageProject } from '~/custome_hook/call_api';
import { TableForViewTodo } from '~/pages';
function Project() {
    const { refetch, response } = useGetData();
    const { isDisplayFormAddEditViewPageProject, listTodoSendServer } = useSelector(
        (state: RootState) => state.manageAppTodo,
    );
    const dispatchOfRedux = useDispatch();
    const handleOnClick = () => {
        // check xem trong mảng list trong redux có phần tử >1 hay không ;
        if (listTodoSendServer.length <= 1) {
            toast.error('there is no todo in list');
        }
        if (listTodoSendServer.length > 1) {
            // hỏi người dùng có muốn update hay không .
            dispatchOfRedux(displayFormVerify());
        }
    };
    createTodoHandle(refetch);
    return (
        <section className="">
            {!!!response?.data && <TableAnimation />}
            {!!response?.data && (
                <div className="bg-white  rounded-[12px] px-8 pb-[68px] pt-8 xs_max:px-[--margin4px] xs_max:pt-4 ">
                    <NavAccount />
                    <div className="py-[25px]">
                        <div className="text-center pb-3 ">Những todo chưa dc gửi lên ser ver </div>
                        <TableForViewTodo list={listTodoSendServer} />
                        <button className="bg-[blue] w-full rounded-md text-white mt-3 " onClick={handleOnClick}>
                            ADD TODO
                        </button>
                    </div>
                    <TableForNewApi listTodo={response?.data} refetch={refetch} />
                    {isDisplayFormAddEditViewPageProject && (
                        <EditAddViewFormPageProject listTodo={response?.data} refetch={refetch} />
                    )}
                </div>
            )}
        </section>
    );
}

export default Project;
/* 
Các chức năng sau phải hoàn thành :
getdate từ server : 
thử 3 lần : axios??
nếu thành công thì lấy data , nếu không thành công thì in ra lỗi 
feature 2 : when create todo if có lỗi khi update 1 cái nào thì cần thông báo lại cho người dùng 
*/
