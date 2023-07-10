import { watch } from '~/handlelogic';
import * as React from 'react';

function WatchTime() {
    const [timer, setTimer] = React.useState('');
    React.useEffect(() => {
        setInterval(() => {
            setTimer(() => {
                return watch();
            });
        }, 1000);
    }, []);

    return <div className='fixed  z-50  '>{timer}</div>;
}

export default WatchTime;
