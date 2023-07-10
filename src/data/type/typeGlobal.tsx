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
        select: string;
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
type typeOfListUser = Array<typeUserAfterCallApiBaseOnID>;

type typeUserAfterCallApiBaseOnID = {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;                         // là số 
    gender: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: string;
    height: number;                        // là số 
    weight: number;                       // là số 
    eyeColor: string;
    hair: {
        color: string;
        type: string;
    };
    domain: string;
    ip: string;
    address: {
        address: string;
        city: string;
        coordinates: {
            lat: number;                       // là số 
            lng: number;                       // là số 
        };
        postalCode: string;
        state: string;
    };
    macAddress: string;
    university: string;
    bank: {
        cardExpire: string;
        cardNumber: string;
        cardType: string;
        currency: string;
        iban: string;
    };
    company: {
        address: {
            address: string;
            city: string;
            coordinates: {
                lat: number;                       // là số 
                lng: number;                       // là số 
            };
            postalCode: string;
            state: string;
        };
        department: string;
        name: string;
        title: string;
    };
    ein: string;
    ssn: string;
    userAgent: string;
};


export type { typeOfListUser, OutPutFormFilter, typeUserAfterCallApiBaseOnID };

