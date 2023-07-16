/* 
feature : avoid repetition 
ex: when user press button repeatedly ==> we will trigger last Press 
it has problem need fixed : 
*/

let timeOutIdForDebounce: any;
const debounce = (fn: any, delay: number) => {
    function delayFunction() {
        if (timeOutIdForDebounce) {
            clearTimeout(timeOutIdForDebounce);
        }
        timeOutIdForDebounce = setTimeout(() => {
            fn();
        }, delay);
    }
    delayFunction();
};

export default debounce;
/* 


*/
