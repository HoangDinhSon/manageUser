import * as type from '~/data/type';
function removeUserFromList(listUser: type.typeOfListUser, user: type.typeUserAfterCallApiBaseOnID) {
    let listUserAfterRemove: type.typeOfListUser = [];
    if (listUser.length > 0) {
        listUserAfterRemove = listUser.filter((eachUser) => {
            return !(eachUser.id === user.id);
        });
    }
    return listUserAfterRemove;
}
export default removeUserFromList;
