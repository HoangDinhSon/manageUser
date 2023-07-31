import { NavLink } from 'react-router-dom';
import * as CONST from '~/data/constance_for_page';

function NavAccount() {
    return (
        <div className="nav_for_table flex gap-1 h-[54px] items-end   border-b-[length:--borderWidth] border-[#EBEBEB]">
            <NavLink
                to={CONST.LINK_PAGE_ACCOUNT}
                end
                className={({isActive}) => (isActive ? 'active_for_account_nav' : 'normal_for_account_nav')}
            >
                All
            </NavLink>
            <NavLink
                to={CONST.LINK_PAGE_PARTNER}
                end
                className={({isActive}) => (isActive ? 'active_for_account_nav' : 'normal_for_account_nav')}
            >
                Partner
            </NavLink>
            <NavLink
                to={CONST.LINK_PAGE_VINOVA}
                className={({isActive}) => (isActive ? 'active_for_account_nav' : 'normal_for_account_nav')}
            >
                Vinova
            </NavLink>
        </div>
    );
}

export default NavAccount;
