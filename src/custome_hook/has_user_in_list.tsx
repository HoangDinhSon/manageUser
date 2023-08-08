import * as type from '~/data/type';
// type listUser =Partial<T>[]
function hasUserInList(listUser: type.typeOfListUser, user: type.typeUserAfterCallApiBaseOnID): boolean {
    let flag = false;
    listUser.forEach((element) => {
        if (element.id === user.id) {
            flag = true;
        }
    });
    return flag;
}
export default hasUserInList;
/* 
check user in list.
if user in list return true 
if user without list return false 
*/
