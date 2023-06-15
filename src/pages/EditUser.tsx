import { useLocation } from 'react-router-dom';

const InputTowRowTowCol = () => {
    return (
        <div className="grid grid-cols-2 gap-6">
            <div className="my_div_after after:content-['0/50'] ">
                <p className="">First Name</p>
                <input type="text" className="my_input " placeholder="First Name" />
            </div>
            <div className="my_div_after after:content-['0/50']">
                <p>Last Name</p>
                <input type="text" className="my_input" placeholder="Last Name" />
            </div>
            <div  className="my_div_after after:content-['0/50']">
                <p>Alias</p>
                <input type="text" className="my_input" placeholder="Aias" />
            </div>
            <div  className="my_div_after after:content-['0/50']">
                <p>Role</p>
                <input type="text" className="my_input" placeholder="Role" />
            </div>
        </div>
    );
};
const InputTowRow = () => {
    return (
        <div>
            <p className='my_after_star'>Email</p>
            <input type="text" className="my_input w-full" />
            <p className='my_after_star'>Phone</p>
            <input type="text" className="my_input w-full" />
        </div>
    );
};

function EditUser() {
    const location = useLocation();
    console.log(location);

    return (
        <div className="edit_form mx-5 mt-[98px]  bg-[white] w-full rounded-xl  ">
            <div className="mx-5 my-7 max-w-[697px]">
                <InputTowRowTowCol />
                <InputTowRow />
                <hr />
                <div>
                    <p>Contract Type</p>
                    <input type="text" />
                </div>
                <InputTowRowTowCol />
                <hr />
                <div className="flex justify-between">
                    <div>
                        <p>Team</p>
                        <input type="text" placeholder="Propatition" />
                    </div>
                    <div>
                        <p>Position</p>
                        <input type="text" placeholder="Propatition" />
                    </div>
                </div>
                <div>
                    <p>Level</p>
                    <input type="text" />
                </div>

                <div>
                    <p>Skills</p>
                    <div>JAva , JS , Python</div>
                    <input type="text" />
                </div>
                <button>Save</button>
            </div>
        </div>
    );
}

export default EditUser;
