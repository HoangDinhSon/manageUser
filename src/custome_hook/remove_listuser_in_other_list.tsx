import * as type from "~/data/type"
type typeList = type.typeOfListUser
function removeListUserInOtherList(RootList:typeList, list:typeList) {
    const listUserAfterRemove = RootList.filter((element) => {
        let flag = false;
        list.forEach((user) => {
            if ((element.id === user.id)) {
                flag = true;
            }
        });
        return !flag;
    });
    return listUserAfterRemove;
}
export default removeListUserInOtherList;
/* 
    remove listUser in RootListUser 

*/
