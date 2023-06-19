import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
import { getUserBaseOnID, editUserBaseOnID } from '../Api/logTimeApi';
import { SkillDisplayInput } from '../components';
import { arrowSelect, calendar } from '../assets/icon';
import { useGlobalState } from '../store/Provider';
import { actions } from '../store';
import { ID_FOR_EDIT_DEFAULT ,LINK_PAGE_ACCOUNT_EDIT} from '../constance_for_page';
import { UserAfterEdit } from '../type/typeComponentEditUser';
type typeOption = {
    content: string;
    value: string | number;
};

const listOptionCompany = [
    { value: 'vinovaOne', content: 'VinovaOne' },
    { value: 'vinovaTow', content: 'VinovaTow' },
];
const listOptionOffice = [
    { value: 'hn', content: 'Hà Nội' },
    { value: 'hcm', content: 'Hồ Chí Minh' },
];
const listOptionTeam = [
    { value: 'propation1', content: 'Propation1' },
    { value: 'propation2', content: 'Propation2' },
];
const listOptionPotion = [
    { value: 'lead', content: 'Lead' },
    { value: 'employee', content: 'Employee' },
];
const listOptionLevel = [
    { value: 'senior', content: 'Senior' },
    { value: 'fresher', content: 'Fresher' },
];
const listContractType = [
    { value: 'short', content: 'Short' },
    { value: 'middle', content: 'Middle' },
    { value: 'long', content: 'Long' },
    { value: 'infinity', content: 'Infinity' },
];
function PhoneNumber({ nameCodeCountry, namePhoneNumber, register, phone }: any) {
    const codePhone = phone.slice(0, 3); //string
    const phoneAfter = phone.slice(3);
    return (
        <>
            <p className="my_after_star ">Phone</p>
            <div className="flex relative ">
                <img src={arrowSelect} alt="" className="absolute  left-3 top-4 text-[14px]" />
                <select
                    className=" my_hidden_icon_select w-[76px] pl-8  h-[42px] rounded-l-[5px]  outline outline-1 outline-[--outlineColor] text-[#666666]"
                    name={nameCodeCountry}
                    {...register(nameCodeCountry)}
                    defaultValue={codePhone}
                >
                    <option value="+84">+84</option>
                    <option value="+85">+85</option>
                    <option value="+86">+86</option>
                    <option value="+63">+63</option>
                </select>
                <label htmlFor="phoneNumber"></label>
                <input
                    defaultValue={phoneAfter}
                    name={namePhoneNumber}
                    {...register(namePhoneNumber)}
                    id="phoneNumber"
                    type="text"
                    className="w-[calc(100%-76px)] outline outline-1 outline-[--outlineColor] rounded-r-[5px] pl-4"
                />
            </div>
        </>
    );
}
function Select({ nameSelect, listOption, label, register }: any) {
    return (
        <div>
            <p className="my_after_star pb-[5px]">{label}</p>
            <div className="relative">
                <img src={arrowSelect} alt="" className="absolute right-4 top-[50%] -translate-y-[50%]" />
                <select
                    {...register(nameSelect)}
                    name={nameSelect}
                    className="w-full h-[42px] outline outline-1 outline-[--outlineColor] rounded-[5px] px-4  my_hidden_icon_select"
                >
                    {listOption.map((option: typeOption, index: any) => (
                        <option value={option.value} key={index}>
                            {option.content}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
function Input({ content, icon, name, register, value }: any) {
    return (
        <div>
            <p className="my_after_star">{content}</p>
            <div className="relative ">
                <img src={icon} alt="" className="absolute right-4 top-[50%] -translate-y-[50%] " />
                <input
                    type="text"
                    className="my_input"
                    placeholder={content}
                    name={name}
                    {...register(name)}
                    value={value}
                />
            </div>
        </div>
    );
}
function InputWithCharacter({ label, numberCharacter, register, name, value }: any) {
    return (
        <div>
            <p className="my_after_star">{label}</p>
            <div className="relative">
                <p className="absolute right-4 top-[50%] bottom-3 text-[#999999] text-[12px] ">{`${numberCharacter}/50`}</p>
                <input type="" className="my_input " placeholder={label} {...register(name)} defaultValue={value} />
            </div>
        </div>
    );
}


function EditUser() {
    const [state, dispatch] = useGlobalState();
    const { register, handleSubmit } = useForm();
    const [listSkill, setListSkill] = useState<Array<string>>([]);
    if (state.idForEdit===ID_FOR_EDIT_DEFAULT){
        location.href="http://localhost:4000/accounts"
    }

    const { data, status } = useQuery({
        queryKey: ['getUserForEdit', state.idForEdit],
        queryFn: () => getUserBaseOnID(state.idForEdit),
        onError: () => {
            toast.error('fail get user for edit');
        },
    });
    const { mutate } = useMutation({
        mutationFn: editUserBaseOnID,
        onSuccess: (res) => {
            console.log('res after edit done ', res);
            dispatch(actions.editUser(res));
        },
        onError: () => {
            toast.error('Fail Update User to Server!!!');
        },
    });

    const onSubmitForm = (formData: any) => {
        mutate({
            id: state.idForEdit,
            informationAfterEdit: { ...formData, listSkill: listSkill },
        });
    };
    const getListSkill = (listSkillPayload: Array<string>) => {
        setListSkill(listSkillPayload);
    };

    return (
        <div className="edit_form ">
            <Toaster />
            {status === 'loading' && <div>loadingOfEditUser...</div>}
            {status === 'error' && <div>error</div>}
            {status === 'success' && (
                <div className="mx-5 my-7 max-w-[697px]">
                    <form action="submit" onSubmit={handleSubmit(onSubmitForm)}>
                        {/*onSubmit={handleSubmit(onSubmitForm)}*/}
                        {/* Name */}
                        <div className="grid grid-cols-2 gap-6">
                            <InputWithCharacter
                                label="First Name"
                                numberCharacter={0}
                                register={register}
                                name={'firstName'}
                                value={data.firstName}
                            />
                            <InputWithCharacter
                                label="Last Name"
                                numberCharacter={0}
                                register={register}
                                name={'lastName'}
                                value={data.lastName}
                            />
                            <InputWithCharacter label="Alias" numberCharacter={0} register={register} name={'alias'} />
                            <Select label="Role" listOption={listContractType} nameSelect="role" register={register} />
                        </div>
                        <div className="pt-6">
                            <Input content="Email" name="email" register={register} defaultValue={data.email} />
                            <div className="pt-6">
                                <PhoneNumber
                                    nameCodeCountry="phoneCodeCountry"
                                    namePhoneNumber="phoneNumber"
                                    register={register}
                                    phone={data.phone}
                                />
                            </div>
                        </div>
                        <hr className="bg-[#EBEBEB]  my-8 " />
                        {/* Contract */}
                        <Select
                            label="Contract Type"
                            listOption={listContractType}
                            nameSelect="contractType"
                            register={register}
                        />
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            <Input
                                content="Contract Start Date"
                                icon={calendar}
                                name="contractStartDate"
                                register={register}
                            />
                            <Input
                                content="Contract End Date"
                                icon={calendar}
                                name="contractEndDate"
                                register={register}
                            />
                            <Select
                                label="Company"
                                listOption={listOptionCompany}
                                nameSelect="company"
                                register={register}
                            />
                            <Select
                                label="Office"
                                listOption={listOptionOffice}
                                nameSelect="office"
                                register={register}
                            />
                        </div>
                        <hr className="bg-[#EBEBEB]  my-8 " />
                        {/* Team */}
                        <div className="grid grid-cols-2 gap-6 pb-6">
                            <Select label="Team" listOption={listOptionTeam} nameSelect="team" register={register} />
                            <Select
                                label="Position"
                                listOption={listOptionPotion}
                                nameSelect="position"
                                register={register}
                            />
                        </div>
                        <Select label="Level" listOption={listOptionLevel} nameSelect="level" register={register} />
                        <SkillDisplayInput resultListSkill={getListSkill} />
                        <button className="w-full h-[42px] rounded bg-[--ColorBgButton]">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditUser;
