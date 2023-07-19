import React from 'react';
import { useEffect } from 'react';
import {LINK_PAGE_ACCOUNT_EDIT} from "~/data/constance_for_page"
function useDetectClickOutside(ref: React.MutableRefObject<any>, [isDisPlay, setIsDisplay]:[boolean, React.Dispatch<React.SetStateAction<boolean>>]) {
    useEffect(() => {
        const handleMouseDown = (e: any) => {
            if (isDisPlay && ref.current && !ref.current.contains(e.target)) {
                setIsDisplay(false);
            }
        };
        document.addEventListener('mousedown', handleMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
        };
    }, [ref, isDisPlay]);
}
export default useDetectClickOutside;
/* 
ref have type const ref= useRef(HTMLelemnt )
[isDisPlay, setIsDisplay] = useState(boolean)
this function use change state 

*/
