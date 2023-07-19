import { IconcancelInFromDetaile } from '../../assets/icon';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';

function DetailPropertyUser({ heading, content }: any) {
    return (
        <div className="whitespace-nowrap overflow-auto">
            <h5>{heading}</h5>
            <p className="whitespace-nowrap overflow-auto">{content}</p>
        </div>
    );
}

function FormViewUser() {
    const [state, dispatch] = useGlobalState();
    const handleCloseFormVierUser = () => {
        dispatch(actions.closeFormViewUser());
    };
    const eachUser = state.UserForFormViewAfterCallApi;
    const responsiveUI = (): string => {
        const hScreen = window.innerHeight;
        const widthScreen = window.innerWidth;

        if (widthScreen <= parseInt(import.meta.env.VITE_BREAKPOINTS_XS)) {
            return 'fixed z-[100]  top-0 bottom-0 left-0 right-0 bg-white p-5';
        }
        if (hScreen < 740) {
            return 'fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[100] w-[602px] bg-white p-8 rounded-lg h-screen overflow-auto';
        }
        return 'fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[100]  w-[602px] bg-white p-8 rounded-lg ';
    };

    return (
        <section className="account_detail_form  fixed z-50 top-0 left-0  w-screen h-screen">
            <div className={responsiveUI()} onClick={(e)=>e.stopPropagation()}>
                <div className="flex justify-between">
                    <h4>Account Details</h4>
                    <img
                        src={IconcancelInFromDetaile}
                        alt=""
                        onClick={handleCloseFormVierUser}
                        className="cursor-pointer"
                    />
                </div>
                <div className="form_view_layout">
                    <DetailPropertyUser heading="First Name" content={eachUser?.firstName} />
                    <DetailPropertyUser heading="Last Name" content={eachUser?.lastName} />
                    <DetailPropertyUser heading="gender" content={eachUser.gender} />
                    <DetailPropertyUser heading="age" content={eachUser.age} />
                    <DetailPropertyUser heading="Email" content={eachUser?.email} />
                    <DetailPropertyUser heading="eyeColor" content={eachUser.eyeColor} />
                    <DetailPropertyUser heading="ID" content={eachUser?.id} />
                    <DetailPropertyUser heading="Phone" content={eachUser?.phone} />
                </div>
                <hr className="my-6 xs_max:my-3" />
                <div className="form_view_layout">
                    <DetailPropertyUser heading="bloodGroup" content={eachUser.bloodGroup} />
                    <DetailPropertyUser heading="university" content={eachUser.university} />
                    <DetailPropertyUser heading="height" content={eachUser.height} />
                    <DetailPropertyUser heading="Company" content={eachUser?.company.name} />
                    <DetailPropertyUser heading="Office" content={eachUser?.company.department} />
                </div>
                <hr className="my-6 xs_max:my-3" />
                <div className="form_view_layout">
                    <DetailPropertyUser heading="city" content={eachUser.address.city} />
                    <DetailPropertyUser heading="userAgent" content={eachUser.userAgent} />
                    <DetailPropertyUser heading="domain" content={eachUser.domain} />
                    <DetailPropertyUser heading="image" content="Click Here to display image" />
                </div>
                <hr className="my-6 xs_max:my-3" />
                <p className="pt-2">Created on 12/02/2022</p>
            </div>
        </section>
    );
}
// son
export default FormViewUser;
