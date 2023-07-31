import { useLocation } from 'react-router-dom';
import { useRef, useMemo } from 'react';
import * as CONST from '~/data/constance_for_page';
type valueOfFunction = 'all' | 'vinova' | 'partner' 
function useKindOfTable(): valueOfFunction {
    const location = useLocation();
    const refKindOfPage = useRef<valueOfFunction>('all');
    const { pathname } = location;
    useMemo(() => {
        if (pathname.includes(CONST.LINK_PAGE_PARTNER)) {
            refKindOfPage.current = 'partner';
        } else if (pathname.includes(CONST.LINK_PAGE_VINOVA)) {
            refKindOfPage.current = 'vinova';
        } else {
            refKindOfPage.current = 'all';
        }
    }, [pathname]);
    return refKindOfPage.current;
}

export default useKindOfTable;
/* 
useKindOfTable only return 3 value : "all", "vinova", partner 


*/
