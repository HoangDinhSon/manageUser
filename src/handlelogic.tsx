import { CriterialForFilter } from './constance_for_page';

const findIndex = (id: number, arrayObject: []): number => {
    let indexCurrent: number = -1;
    arrayObject.map((product: any, index: number) => {
        if (product.id === id) {
            indexCurrent = index;
            return;
        }
    });
    return indexCurrent;
};

const checkNumberOFCriterialForFilter  = (criterial: CriterialForFilter | any):number => {
    let sum = 0;
    for (let key in criterial) {
        if (criterial[key][key] === true) {
            sum++;
        }
    }
    return sum;
};
export { findIndex ,checkNumberOFCriterialForFilter};
