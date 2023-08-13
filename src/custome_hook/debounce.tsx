/* 
feature : avoid repetition 
ex: when user press button repeatedly ==> we will trigger last Press 
it has problem need fixed : 
*/

let timeOutIdForDebounce: any;
const debounce = (callBackFunction: any, delay: number) => {
    function delayFunction() {
        if (timeOutIdForDebounce) {
            clearTimeout(timeOutIdForDebounce);
        }
        timeOutIdForDebounce = setTimeout(() => {
            callBackFunction();
        }, delay);
    }
    delayFunction();
};

export default debounce;
/* 


*/
