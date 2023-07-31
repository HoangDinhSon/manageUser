import * as type from '~/data/type';
function sortUser(listUser: type.typeOfListUser, criterial = 'abc') {
    const newListUser = [...listUser];

    const sortABC = () => {
        newListUser.sort((a: type.typeUserAfterCallApiBaseOnID, b: type.typeUserAfterCallApiBaseOnID) => {
            const x = a.firstName.toLocaleLowerCase();
            const y = b.firstName.toLocaleLowerCase();
            return x < y ? -1 : 1;
        });
    };
    if (criterial === 'abc') {
        sortABC();
    }

    return newListUser
}

export default sortUser;
/* 

  try {
        if (criterial === 'abc' || criterial === 'minMax') {
        }
    } catch (error) {
        console.log('value of argument only "abc" or "minMax" >>> criterial will get value = abc');
    }

*/
