// import AnimationMountAndUnMount from '../components/animationUI/AnimationMountAndUnMount';
// import { useState } from 'react';

function FilterUser() {
    // const [state, setState] = useState(false);
    // function Notification() {
    //     return (
    //         <div className='fixed top-[100px] left-[100px]'>
    //             <div>Hello Notification</div>
    //             <div>Hello Notification</div>
    //             <div>Hello Notification</div>
    //             <div>Hello Notification</div>
    //             <div>Hello Notification</div>
    //         </div>
    //     );
    // }
    // const handleDisplay = () => {
    //     setState(!state);
    // };

    return (
        <div className="fixed top-[100px] left-[100px] w-[100px] h-[100px] bg-slate-400  z-[30] overflow-hidden">
            {/* <AnimationMountAndUnMount isMount={state}>
                <Notification />
            </AnimationMountAndUnMount>
            <button onClick={handleDisplay}>toggle </button> */}
            <div className="fixed top-[150px] left-[30px] yellow w-[100px] h-[100px] "></div>


        </div>
    );
}

export default FilterUser;
