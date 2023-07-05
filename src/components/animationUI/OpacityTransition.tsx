/*
 tạo ra một component smooth when mount and unmount
 input : React Component 
 output : void 
 effect : 
*/
import { useState, useEffect } from 'react';
function OpacityTransition({ children }: any) {
    const [opacityTransition, setOpacityTransition] = useState('opacity-0  transition-all duration-[--timeOpacity]');
    useEffect(() => {
        setTimeout(() => {
            setOpacityTransition('opacity-100  transition-all duration-[--timeOpacity]');
        }, 300);
    });
    return <div className={opacityTransition}>{children}</div>;
}

export default OpacityTransition;
//{opacityTransition}
