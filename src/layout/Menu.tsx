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
import {IconMenu} from "../components/compnent_layout";

function Menu({ children }: any) {
    return (
        <div className="bg-[#ECECEC] w-full">
            <div className="h-screen w-[78px] bg-[#fff]  fixed top-0">
                <div className="flex flex-col items-center gap-[53px] pt-6">
                    <img src={hamberger} alt="" />
                    <IconMenu icon={dasboard} iconNameMenu={nameOfDashboard} />
                    <IconMenu icon={project} iconNameMenu={nameOfproject} />
                    <IconMenu icon={stacks} iconNameMenu={nameOfStacks} />
                    <IconMenu icon={Report} iconNameMenu={nameOfreport} />
                    <IconMenu icon={accounts} iconNameMenu={nameOfaccounts} />
                    <IconMenu icon={RoleManager} iconNameMenu={nameOfRolemanager} />
                </div>
            </div>
            <div className="fixed top-0 left-[0] right-0 h-[78px] px-6 bg-[#fff] ">
                <div className="flex justify-between items-center  h-[78px]">
                    <div className="Left_Nav flex items-center gap-[15px]">
                        <img src={hamberger} alt="" />
                        <h4>Accounts</h4>
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
            {children}
        </div>
    );
}

export default Menu;
