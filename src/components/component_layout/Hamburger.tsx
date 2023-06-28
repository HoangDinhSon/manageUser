import { iconArrowRight, iconArrowLeft } from '../../assets';
import { useEffect, useState } from 'react';
import { ContextState, actions } from '../../store';
import { useTheme, useMediaQuery } from '@mui/material';
import { HamburgerMui } from '../../assets';

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
            <div>{children}</div>
        </div>
    );
}

/*
chức năng : tạo hiệu ứng transition cho thanh asideseBar 
hoạt động : xuất hiện icon Mui --> sau khi nhấn vào icon Mui thì w-0--> w-85px 


*/


function HamburgerForAsideBar({ children }: any) {
    const [isDisplay, setIsDisplay] = useState(false);
    const [classChildren, setClassChildren] = useState('');
    const [state, dispatch] = ContextState.useGlobalState();
    const theme = useTheme();
    const XS = parseInt(import.meta.env.VITE_BREAKPOINTS_XS) + 1; //375+1
    const maxXS: boolean = useMediaQuery(theme.breakpoints.down(XS)); //(0-->375px ]

    let classDiv = 'w-[85px] transition-[width] duration-[--durationTableUser] overflow-hidden ';
    if (isDisplay === false) {
        classDiv = 'w-0 transition-[width] duration-[--durationTableUser] overflow-hidden';
    }
    // sau khi xuất hiện thì asid menu dc fixed
    const isDisplayFalse = isDisplay === false;
    useEffect(() => {
        if (isDisplay === true) {
            setTimeout(() => {
                setClassChildren('fixed z-[3]');
            }, 1000);
        }
    }, [isDisplayFalse]);

    const handleDisplay = () => {
        setClassChildren('');
        setIsDisplay(!isDisplay);
        dispatch(actions.togleDisplayAsideMenu(state.isDisplayAsideMenu));
    };
    return (
        <div className={classDiv}>
            <div
                className="fixed top-[calc((var(--heightNav)-24px)/2)] left-[calc((var(--heightNav)-24px)/2)] xs_max:top-[calc((var(--hNavRes)-24px)/2)]  z-[4] cursor-pointer"
                onClick={handleDisplay}
            >
                <HamburgerMui
                    sx={{
                        color: state.isDisplayAsideMenu ? 'red' : '#9DA7B9',
                    }}
                />
            </div>
            <div className={classChildren}>{children}</div>
            {/* bg for (0-->375] */}
            {maxXS && state.isDisplayAsideMenu && (
                <div className="fixed left-[78px] top-[58px]  w-screen h-screen z-[2] bg-[#ffffff95]"></div>
            )}
        </div>
    );
}

export { HamburgerForAsideBar };
export default Hamburger;
