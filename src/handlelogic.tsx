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
/* 
1. replace thay thế một vài string bằng string khác 
example : Paragraph  ="son van nam "
        Arrayroot =  ["son" , nam ];
        WordTarget = [ 1 ,2 ];
        hàm sẽ trả về "1 van 2";
        lưu ý : thay thế tương ứng : nhận vào một mảng các string cần thay thề có tính khoảng trắng trước sau 
        không làm thay đổi string ban đầu , 
        bắt đầu một kí tự rỗng và các chuỗi cần thêm 
    
*/
const replaceManyString = (Paragraph: string, [...ArrayRoot]: Array<string>, [...WordTarget]: Array<string>) => {
    if (ArrayRoot.length != WordTarget.length) {
        return 'bạn phải nhập 2 mảng có cùng độ dài ';
    }
    let paragraphNew = '';
    paragraphNew = ArrayRoot.reduce((total: string, item: string, index: number) => {
        total = total.replace(` ${item}`, ` ${WordTarget[index]}`);
        return total;
    }, Paragraph);
    return paragraphNew;
};
export { findIndex, checkNumberOFCriterialForFilter, replaceManyString };
