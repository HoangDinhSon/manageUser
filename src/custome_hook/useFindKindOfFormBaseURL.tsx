import { useRef,  useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import * as Page from '~/data/constance_for_page';
const listPageAndKind = [
    { page: Page.PAGE_ACCOUNT, kindOfForm: [Page.ADD, Page.VIEW, Page.EDIT] },
    { page: Page.PAGE_DASHBOARD, kindOfForm: [Page.ADD, Page.VIEW, Page.EDIT] },
    { page: Page.PAGE_PROJECT, kindOfForm: [Page.ADD, Page.VIEW, Page.EDIT] },
    { page: Page.PAGE_REPORT, kindOfForm: [Page.ADD, Page.VIEW, Page.EDIT] },
    { page: Page.PAGE_ROLEMANAGER, kindOfForm: [Page.ADD, Page.VIEW, Page.EDIT] },
    { page: Page.PAGE_STACKS, kindOfForm: [Page.ADD, Page.VIEW, Page.EDIT] },
];

function useFindKindOfFormBaseURL() {
    const location = useLocation();
    const refLocation = useRef(location);
    let refKindOfForm = useRef({ kindOfForm: 'UNKNOW_KIND_OF_FORM', page: 'UNKNOW_PAGE' });
    useMemo(() => {
        listPageAndKind.map((element) => {
            if (refLocation.current.pathname.includes(element.page)) {
                element.kindOfForm.map((form) => {
                    if (refLocation.current.pathname.includes(form)) {
                        refKindOfForm.current = { page: element.page, kindOfForm: form };
                    } else refKindOfForm.current.page = element.page;
                });
            }
        });
    }, []);
    return refKindOfForm.current;
}
export default useFindKindOfFormBaseURL;

/* 
input : url of address var 
output: detail page and kind of Form {page : report , kindOfForm : add}
*/
