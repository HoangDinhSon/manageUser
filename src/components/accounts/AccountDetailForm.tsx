const InformUser = {
    id: 1,
    firstName: 'Terry',
    maidenName: 'Smitham',
    email: 'atuny0@sohu.com',
    team: 'none',
    company: {
        address: {
            address: '629 Debbie Drive',
            city: 'Nashville',
            coordinates: {
                lat: 36.208114,
                lng: -86.58621199999999,
            },
            postalCode: '37076',
            state: 'TN',
        },
        department: 'Marketing',
        name: "Blanda-O'Keefe",
        title: 'Help Desk Operator',
    },
    role: 'none',
    status: 'none',
    // detail
    phone: '+63 791 675 8914',
    contractType: 'none',
    contractStartDate: 'none',
    contractEndDate: 'none',
    position: 'none',
    level: 'none',
    skills: 'none',
};
const ArrkeyOfObj = Object.keys(InformUser);
console.log('🚀 ~ file: AccountDetailForm.tsx:34 ~ ArrkeyOfObj:', ArrkeyOfObj);

function AccoutDetailForm() {
    let key : keyof typeof InformUser;
    const newArray:Array<any> =[];
    for(key in InformUser){
        InformUser[key]
        newArray.push(InformUser[key])
    }
    return (
        <section className="account_detail_form h-[610px] w-[602px] bg-[red] p-8">
            <div>
                <h4>Account Details</h4>
                <div className="grid-cols-3 grid gap-6">
                    {ArrkeyOfObj.map((key: any) => {
                        return (
                            <div>
                                <h5 key={key}>{key}</h5>
                                <p></p>
                            </div>
                        );
                    })}
                </div>

               
            </div>
        </section>
    );
}

export default AccoutDetailForm;
