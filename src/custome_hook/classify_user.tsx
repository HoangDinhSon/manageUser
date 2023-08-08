/*
 *user has 2 kind all = genderMale +genderFemale
 * gender
 * eyeColor
 */
import * as type from '~/data/type';
type ClassifyUser = type.typeUserAfterCallApiBaseOnID[];

function classifyUser(listUser: ClassifyUser) {
    const listMale: ClassifyUser = [];
    const listFemale: ClassifyUser = [];
    listUser.map((user) => {
        if ((user.gender === 'male')) {
            listMale.push(user);
        } else {
            listFemale.push(user);
        }
    });
    return {
        listMale,
        listFemale,
    };
}

export default classifyUser;
