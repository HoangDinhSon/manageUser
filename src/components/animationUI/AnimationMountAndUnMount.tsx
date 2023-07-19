/* 
tạo ra một animation khi một component bị mount and unmount dùng scale  
*/
import { replaceManyString } from '../../handlelogic';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';

function AnimationMountAndUnMount({ isMount, children }: { isMount: boolean; children: any }) {
    const [state, dispatch] = useGlobalState();
    const handleCloseFormVierUser = () => {
        dispatch(actions.closeFormViewUser());
    };
    let classMountAndUnmount =
        'fixed z-20 top-0 left-0 bg-[--bgAnimation]  w-full h-full    transition-all duration-[1s] scale-x-100 translate-x-0';
    if (isMount === false) {
        classMountAndUnmount = replaceManyString(
            classMountAndUnmount,
            ['scale-x-100', 'translate-x-0'],
            ['scale-x-0', 'translate-x-full'],
        );
    }
    return <div className={classMountAndUnmount} onClick={handleCloseFormVierUser}>{children}</div>;
}

export default AnimationMountAndUnMount;
