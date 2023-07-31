import { OutPutFormFilter } from './data/type';

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

const checkNumberOFCriterialForFilter = (criterial: OutPutFormFilter): number => {
    let sum = 0;
    for (let key in criterial) {
        const x = criterial[key as keyof OutPutFormFilter];
        const y = x[key as keyof typeof x];
        if (!!y === true) {
            sum++;
        }
    }
    return sum;
};
/* 
1. replace thay thế một vài string bằng string khác 
example : Paragraph  ="son van nam "
        Arrayroot =  ["son" , nam ];
        WordTarget = [ "1" ,"2" ];
        hàm sẽ trả về=  [1 van 2];
        lưu ý : thay thế tương ứng : nhận vào một mảng các string cần thay thề có tính khoảng trắng trước sau 
        không làm thay đổi string(Paragraph) ban đầu , 
        bắt đầu một kí tự rỗng và các chuỗi cần thêm 
    
*/
const replaceManyString = (Paragraph: string, [...ArrayRoot]: Array<string>, [...WordTarget]: Array<string>) => {
    // can use try catch repace this if ?? 
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
/* 
Check two object has same property 
    1. check argument has object 
    2. if two object has same key return true , else return false ,
    3. if one or two argument not object return 1 . 

*/
function hasSameProperty(object1: any, object2: any): number | boolean {
    function isObject(objectCheck: any) {
        return typeof objectCheck === 'object' && !Array.isArray(objectCheck) && objectCheck !== null;
    }
    const lengthObject1 = Object.keys(object1).length;
    const lengthObject2 = Object.keys(object2).length;
    if (lengthObject1 !== lengthObject2) {
        return false;
    }
    if (isObject(object1) && isObject(object2)) {
        return Object.keys(object1).every((key) => {
            return object2.hasOwnProperty(key);
        });
    } else {
        console.log('one of the argument not object >>>');
        return -1;
    }
}
/* 
make watch  23:28:30s , 
input : 
output :string "23:28:30s"
*/
function watch(): string {
    const date = new Date();
    let watch: string = '';
    watch = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return watch;
}

export { findIndex, checkNumberOFCriterialForFilter, replaceManyString, hasSameProperty, watch };
