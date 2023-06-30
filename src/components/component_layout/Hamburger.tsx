import { iconArrowRight, iconArrowLeft } from '../../assets';
import { useEffect, useState } from 'react';
import { ContextState, actions } from '../../store';
import { useTheme, useMediaQuery } from '@mui/material';
import { HamburgerMui } from '../../assets';
/*trong này có 2 Hamburger không liên quan đến nhau */

function Hamburger({ children }: any) {
    const [isChecked, setIsChecked] = useState(false);
    let classDiv =
        'flex  bg-[white] fixed   top-[calc(var(--hNavRes)/2)] -translate-y-[50%] right-0 px-[4px] my_hamburger w-[50px] transition-[width] duration-[--timeBtnImport] ';
    if (isChecked) {
        classDiv =
            'flex  bg-[white] fixed  top-[calc(var(--hNavRes)/2)] -translate-y-[50%] right-0 px-[4px] my_hamburger w-[370px] transition-[width] duration-[--timeBtnImport]';
    }
    const handleOnclick = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={classDiv}>
            <input type="checkbox" id="hamburger" className="hidden peer/hamburger" />
            <label
                onClick={handleOnclick}
                htmlFor="hamburger"
                className="absolute top-0 bg-[transparent] w-[41px] h-[41px] rounded-[50%]"
            ></label>
            <img
                src={iconArrowLeft}
                alt=""
                width="41px"
                height="41px"
                className="hidden peer-checked/hamburger:!block  mr-4 "
            />
            <img
                src={iconArrowRight}
                alt=""
                width="41px"
                height="41px"
                className="peer-checked/hamburger:hidden mr-4"
            />
            <main>{children}</main>
        </div>
    );
}
/*
Hamburger Menu 

*/
function HamburgerMenu({onClick}:any){
    const [state, dispatch] = ContextState.useGlobalState();
    const handleOnClick=()=>{
        onClick()
    }
    return(
        <div
        className="fixed top-[calc((var(--heightNav)-24px)/2)] left-[calc((var(--heightNav)-24px)/2)] xs_max:top-[calc((var(--hNavRes)-24px)/2)]  z-[4] cursor-pointer"
        onClick={handleOnClick}
    >
        <HamburgerMui
            sx={{
                color: state.isDisplayAsideMenu ? 'red' : '#9DA7B9',
            }}
        />
    </div>
    )
}


/*
chức năng : tạo hiệu ứng transition cho thanh asideseBar 
hoạt động : xuất hiện icon Mui --> sau khi nhấn vào icon Mui thì w-0--> w-85px 
*/

function HamburgerForAsideBar({ children }: any) {
    const [classChildren, setClassChildren] = useState('');
    const [state, dispatch] = ContextState.useGlobalState();
    const theme = useTheme();
    const XS = parseInt(import.meta.env.VITE_BREAKPOINTS_XS) + 1; //375+1
    const maxXS: boolean = useMediaQuery(theme.breakpoints.down(XS)); //(0-->375px ]
    let classDiv = 'fixed z-[3] w-[--heightNav] h-screen  transition-[all] duration-[--durationTableUser] overflow-hidden  ';
    if (state.isDisplayAsideMenu === false) {
        classDiv = 'fixed z-[3] w-[0] transition-[all] duration-[--durationTableUser] overflow-hidden';
    }
    // sau khi xuất hiện thì asid menu dc fixed
    let idSetTimeout: any;
    useEffect(() => {
        if (state.isDisplayAsideMenu === true) {
            idSetTimeout = setTimeout(() => {
                setClassChildren('fixed z-[3] left-0');
            }, 1000);
        }
    }, [state.isDisplayAsideMenu]);

    const handleDisplay = () => {
        clearTimeout(idSetTimeout);
        setClassChildren('');
        dispatch(actions.togleDisplayAsideMenu(state.isDisplayAsideMenu));
    };
    return (
        <div className={classDiv}>
            <HamburgerMenu onClick= {handleDisplay}/>
            <div className={classChildren}>{children}</div>
        </div>
    );
}

export { HamburgerForAsideBar ,HamburgerMenu,Hamburger};
export default Hamburger;
