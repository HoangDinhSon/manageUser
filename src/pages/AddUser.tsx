import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { addUserToServer } from '../Api/logTimeApi';
import { InputWithCharacter, Select, Input, PhoneNumber, SkillDisplayInput } from '../components';
import { calendar } from '../assets/icon';
import { useGlobalState } from '../store/Provider';
import { actions } from '../store';
import {
    LINK_PAGE_ACCOUNT,
    listOptionTeam,
    listOptionCompany,
    listContractType,
    listOptionLevel,
    listOptionOffice,
    listOptionPotion,
} from '../constance_for_page';


function AddUser() {
    const [state, dispatch] = useGlobalState();
    const { register, handleSubmit, reset } = useForm();
    const [listSkill, setListSkill] = useState<Array<string>>([]);
    const { mutate } = useMutation({
        mutationFn: addUserToServer,
        onSuccess: (res) => {
            toast.success('add user success');
            reset();
            dispatch(actions.addNewUser(res));
        },
        onError: () => {
            toast.error('can not send inform user to server');
        },
    });
    const onSubmitForm = (formData: any) => {
        console.log('formData>>>', formData);
        mutate({
            ...formData,
            listSkill: listSkill,
        });
    };

    const getListSkill = (listSkillPayload: any) => {
        setListSkill(listSkillPayload);
    };

    return (
        <div className="edit_form ">
            <Toaster />
            <div className="mx-5 my-7 max-w-[697px]">
                <form action="submit" onSubmit={handleSubmit(onSubmitForm)}>
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-6">
                        <InputWithCharacter
                            label="First Name"
                            numberCharacter={0}
                            register={register}
                            name={'firstName'}
                            // value={data.firstName}
                        />
                        <InputWithCharacter
                            label="Last Name"
                            numberCharacter={0}
                            register={register}
                            name={'lastName'}
                            // value={data.lastName}
                        />
                        <InputWithCharacter label="Alias" numberCharacter={0} register={register} name={'alias'} />
                        <Select label="Role" listOption={listContractType} nameSelect="role" register={register} />
                    </div>
                    <div className="pt-6">
                        <Input content="Email" name="email" register={register} />
                        <div className="pt-6">
                            <PhoneNumber
                                nameCodeCountry="phoneCodeCountry"
                                namePhoneNumber="phoneNumber"
                                register={register}
                                // phone={data.phone}
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
                        <Input content="Contract End Date" icon={calendar} name="contractEndDate" register={register} />
                        <Select
                            label="Company"
                            listOption={listOptionCompany}
                            nameSelect="company"
                            register={register}
                        />
                        <Select label="Office" listOption={listOptionOffice} nameSelect="office" register={register} />
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
                    <button className="w-full h-[42px] rounded bg-[--ColorBgButton]" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
