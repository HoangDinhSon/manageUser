export const ADD = 'add';
export const EDIT = 'edit';
export const VIEW = 'view';
import * as icon from '~/assets/icon';
import * as linkPage from '~/data/constance_for_page';

export const listMenuAsideBar = [
    {
        icon: icon.dasboard,
        // iconNameMenu: icon.nameOfDashboard,
        name: linkPage.LINK_PAGE_DASHBOARD,
    },
    {
        icon: icon.project,
        // iconNameMenu: icon.nameOfproject,
        name: linkPage.LINK_PAGE_PROJECT,
    },
    {
        icon: icon.stacks,
        // iconNameMenu: icon.nameOfStacks,
        name: linkPage.LINK_PAGE_STACKS,
    },
    {
        icon: icon.Report,
        // iconNameMenu: icon.nameOfreport,
        name: linkPage.LINK_PAGE_REPORT,
    },
    {
        icon: icon.accounts,
        // iconNameMenu: icon.nameOfaccounts,
        name: linkPage.LINK_PAGE_ACCOUNT,
    },
    {
        icon: icon.RoleManager,
        // iconNameMenu: icon.nameOfRolemanager,
        name: linkPage.LINK_PAGE_ROLEMANAGER,
    },
];

//import * as CONST from "~/data/constance_for_page/constantGlobal"
