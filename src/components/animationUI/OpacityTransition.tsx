// tạo ra một component smooth when mount and unmount
import { useState } from 'react';
function OpacityTransition({ children }: any) {
    const [opacityTransition, setOpacityTransition] = useState('opacity-0  transition-all duration-[2s]');
    setTimeout(() => {
        setOpacityTransition('opacity-100  transition-all duration-[2s]');
    }, 2000);

    return <div className={opacityTransition}>{children}</div>;
}

export default OpacityTransition;
//{opacityTransition}