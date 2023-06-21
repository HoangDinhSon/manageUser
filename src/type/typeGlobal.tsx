type typeUser = {
    id: number | string;
    firstName: string;
    maidenName: string;
    email: string;
    company: string;
    phone: string;
    gender: string;
    age: number | string;
    eyeColor: string;
    bloodGroup: string;
    university: string;
    height: string;
};
type OutPutFormFilter = {
    gender: {
        gender: boolean;
        select: string;
    };
    age: {
        age: boolean;
        select: number;
    };
    eyeColor: {
        eyeColor: boolean;
        select:string;
    };
    bloodGroup: {
        bloodGroup: boolean;
        select: string;
    };
    university: {
        university: boolean;
        select: string;
    };
    height: {
        height: boolean;
        select: number;
    };
};
type typeOfListUser = Array<typeUser>;
export type { typeOfListUser, typeUser ,OutPutFormFilter};
