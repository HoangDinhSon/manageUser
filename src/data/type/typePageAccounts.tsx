type TypeOfUser = {
    id: number | string;
    firstName: string;
    maidenName: string;
    email: string;
    company: any;
    phone: string;
};
type typeOption = {
    content: string;
    value: string | number;
};


export type { TypeOfUser, typeOption };
