import { CriterialForFilter } from './type';

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

const checkNumberOFCriterialForFilter = (criterial: CriterialForFilter | any): number => {
    let sum = 0;
    for (let key in criterial) {
        if (criterial[key][key] === true) {
            sum++;
        }
    }
    return sum;
};
// replace thay thế một vài string bằng string khác 
const replaceManyString = (Paragraph: string, [...ArrayRoot]: Array<string>, [...WordTarget]: Array<string>) => {
    let paragraphNew = '';
    paragraphNew = ArrayRoot.reduce((total: string, item: string, index: number) => {
        total = total.replace(item, WordTarget[index]);
        return total;
    }, Paragraph);
    return paragraphNew;
};
export { findIndex, checkNumberOFCriterialForFilter, replaceManyString };
