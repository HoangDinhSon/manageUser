import * as type from '~/data/type';

function hasUserInList(listUser: type.typeOfListUser, user: type.typeUserAfterCallApiBaseOnID): boolean {
    const isExist = listUser.includes(user);
    return isExist;
}
export default hasUserInList;
/* 
test mảng listUser empty trả về false 
*/
