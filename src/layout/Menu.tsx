import { accounts, dasboard, hamberger, project, stacks, RoleManager, Report } from '../assets/icon';
import {
    nameOfDashboard,
    nameOfRolemanager,
    nameOfStacks,
    nameOfaccounts,
    nameOfproject,
    nameOfreport,
} from '../assets/icon';
import { icondocument, iconimportuser, iconplususer, iconuploaduser } from '../assets/icon';
import { Button } from '@mui/material';
import { IconMenu } from '../components/compnent_layout';
import { useGlobalState } from '../store/Provider';
import { actions } from '../store';

function Menu({ children }: any) {
    const [state, dispatch] = useGlobalState();
    const handleSwitchDisplay = () => {
        dispatch(actions.togleDisplayAsideMenu(state.togleDisplayAsideMenu));
    };
    return (
        <div className="menu_Layout flex bg-[#ECECEC]  w-full h-full relative">
            {/* 1/4. Aside Bar */}
            {state.togleDisplayAsideMenu && (
                <div className={`${state.togleDisplayAsideMenu?"w-[85px]":""}`}>
                    <div className=" w-[78px] bg-[#fff] fixed z-[11]  top-0 bottom-0">
                        <div className="flex flex-col items-center gap-[53px] pt-6">
                            <img src={hamberger} alt="" onClick={handleSwitchDisplay} />
                            <IconMenu icon={dasboard} iconNameMenu={nameOfDashboard} />
                            <IconMenu icon={project} iconNameMenu={nameOfproject} />
                            <IconMenu icon={stacks} iconNameMenu={nameOfStacks} />
                            <IconMenu icon={Report} iconNameMenu={nameOfreport} />
                            <IconMenu icon={accounts} iconNameMenu={nameOfaccounts} />
                            <IconMenu icon={RoleManager} iconNameMenu={nameOfRolemanager} />
                        </div>
                    </div>
                </div>
            )}
            {/*2/4. TopNav Bar */}
            <div className="fixed top-0 left-[0] right-0 h-[78px] px-[20px] bg-[#fff] z-10 2xl:px-[calc((100%-1440px)/2)] ">
                <div className="flex justify-between items-center  h-[78px]">
                    <div className="Left_Nav flex items-center gap-[15px]" onClick={handleSwitchDisplay}>
                        {!state.togleDisplayAsideMenu && <img src={hamberger} alt="" />}
                        <h4 className={`${state.togleDisplayAsideMenu ? 'pl-[68px]' : ''}`}>Accounts</h4>
                    </div>
                    <div className="Right_Nav flex items-center gap-[10px]">
                        <img src={icondocument} alt="" />
                        <img src={iconimportuser} alt="" />
                        <img src={iconuploaduser} alt="" />
                        <Button
                            variant="contained"
                            sx={{
                                height: '40px',
                            }}
                        >
                            <img src={iconplususer} alt="" />
                            New Account
                        </Button>
                    </div>
                </div>
            </div>
            {/*3/4. Background  */}
            <div className="fixed  bg-[#ECECEC] top-0 bottom-0 left-0 right-0 z-[-1]"></div>
            {/*4/4. Content */}
            {children}
        </div>
    );
}

export default Menu;
