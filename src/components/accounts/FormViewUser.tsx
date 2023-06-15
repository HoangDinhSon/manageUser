import { IconcancelInFromDetaile } from '../../assets/icon';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';

function DetailPropertyUser({ heading, content }: any) {
    return (
        <div>
            <h5>{heading}</h5>
            <p>{content}</p>
        </div>
    );
}

function FormViewUser() {
    const [state, dispatch] = useGlobalState();
    const handleCloseFormVierUser = () => {
        dispatch(actions.closeFormViewUser());
    };
    
    return (
        <section className="account_detail_form bg-[#00000020] fixed z-20 top-0 left-0 right-0 bottom-0">
            <div className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-30  w-[602px] bg-white p-8 rounded-lg">
                <div className="flex justify-between">
                    <h4>Account Details</h4>
                    <img src={IconcancelInFromDetaile} alt="" onClick={handleCloseFormVierUser} />
                </div>
                <div className="grid-cols-3 grid gap-6 pt-6">
                    <DetailPropertyUser heading="First Name" content={state.UserForFormViewAfterCallApi?.firstName} />
                    <DetailPropertyUser heading="Last Name" content={state.UserForFormViewAfterCallApi?.lastName} />
                    <DetailPropertyUser heading="Alias" content="fd56" />
                    <DetailPropertyUser heading="Role" content="fd56" />
                    <DetailPropertyUser heading="Email" content={state.UserForFormViewAfterCallApi?.email} />
                    <DetailPropertyUser heading="Status" content="fd56" />
                    <DetailPropertyUser heading="ID" content={state.UserForFormViewAfterCallApi?.id} />
                    <DetailPropertyUser heading="Phone" content={state.UserForFormViewAfterCallApi?.phone} />
                </div>
                <hr className="mt-6" />
                <div className="grid-cols-3 grid gap-6 pt-6">
                    <DetailPropertyUser heading="Contract Type" content="fd56" />
                    <DetailPropertyUser heading="Contract Start Date" content="fd56" />
                    <DetailPropertyUser heading="Contract End Date" content="fd56" />
                    <DetailPropertyUser heading="Company" content={state.UserForFormViewAfterCallApi?.company.name} />
                    <DetailPropertyUser
                        heading="Office"
                        content={state.UserForFormViewAfterCallApi?.company.department}
                    />
                </div>
                <hr className="mt-6" />
                <div className="grid-cols-3 grid gap-6 pt-6">
                    <DetailPropertyUser heading="Team" content="fd56" />
                    <DetailPropertyUser heading="Position" content="fd56" />
                    <DetailPropertyUser heading="Level" content="fd56" />
                    <DetailPropertyUser heading="Skills" content="fd56" />
                </div>
                <hr className="mt-6" />
                <p className="pt-2">Created on 12/02/2022</p>
            </div>
        </section>
    );
}

export default FormViewUser;
