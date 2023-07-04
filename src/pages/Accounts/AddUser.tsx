import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useState } from 'react';
import { addUserToServer } from '../../Api/logTimeApi';
import { InputWithCharacter, Select, Input, PhoneNumber, SkillDisplayInput } from '../../components';
import { calendar } from '../../assets/icon';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
import {
    listOptionTeam,
    listOptionCompany,
    listContractType,
    listOptionLevel,
    listOptionOffice,
    listOptionPotion,
} from '../../data/constance_for_page';
import { typeFormAddAndEdit, resolverFormAddUser } from './validationForAccountPage';
import { NameRegisterForm } from '../../data/constance_for_page/constantUI';

function AddUser() {
    const [, dispatch] = useGlobalState();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<typeFormAddAndEdit>(resolverFormAddUser);
    const [listSkill, setListSkill] = useState<Array<string>>([]);
    const { mutate } = useMutation({
        mutationFn: addUserToServer,
        onSuccess: (res) => {
            toast.success('add user success');
            reset();
            dispatch(actions.addNewUser(res));
            toast.success('Add to server success');
            listSkill.length = 0; // xóa hết phần tử trong mảng
        },
        onError: () => {
            toast.error('can not send inform user to server');
        },
    });
    const onSubmitForm = (formData: any) => {
        if (listSkill.length === 0) {
            toast.error('List Skill không dc để trống ');
            console.log('DATA>>>', document.getElementById('IDlistSkill'));
            document.getElementById('IDlistSkill')?.focus();
            return;
        }
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
                            name={NameRegisterForm.firstName}
                            errors={errors}
                            // value={data.firstName}
                        />
                        <InputWithCharacter
                            label="Last Name"
                            numberCharacter={0}
                            register={register}
                            name={NameRegisterForm.lastName}
                            errors={errors}
                            // value={data.lastName}
                        />
                        <InputWithCharacter
                            label="Alias"
                            numberCharacter={0}
                            register={register}
                            name={NameRegisterForm.alias}
                            errors={errors}
                        />
                        <Select label="Role" listOption={listContractType} nameSelect="role" register={register} />
                    </div>
                    <div className="pt-6">
                        <Input content="Email" name={NameRegisterForm.email} register={register} errors={errors} />
                        <div className="pt-6">
                            <PhoneNumber
                                nameCodeCountry={NameRegisterForm.phoneCodeCountry}
                                namePhoneNumber={NameRegisterForm.phoneNumber}
                                register={register}
                                errors={errors}
                            />
                        </div>
                    </div>
                    <hr className="bg-[#EBEBEB]  my-8 " />
                    {/* Contract */}
                    <Select
                        label="Contract Type"
                        listOption={listContractType}
                        nameSelect={NameRegisterForm.contractType}
                        register={register}
                    />
                    <div className="grid grid-cols-2 gap-6 pt-6">
                        <Input
                            content="Contract Start Date"
                            icon={calendar}
                            name={NameRegisterForm.contractStartDate}
                            register={register}
                            errors={errors}
                        />
                        <Input
                            content="Contract End Date"
                            icon={calendar}
                            name="contractEndDate"
                            register={register}
                            errors={errors}
                        />
                        <Select
                            label="Company"
                            listOption={listOptionCompany}
                            nameSelect={NameRegisterForm.company}
                            register={register}
                        />
                        <Select label="Office" listOption={listOptionOffice} nameSelect="office" register={register} />
                    </div>
                    <hr className="bg-[#EBEBEB]  my-8 " />
                    {/* Team */}
                    <div className="grid grid-cols-2 gap-6 pb-6">
                        <Select
                            label="Team"
                            listOption={listOptionTeam}
                            nameSelect={NameRegisterForm.team}
                            register={register}
                        />
                        <Select
                            label="Position"
                            listOption={listOptionPotion}
                            nameSelect={NameRegisterForm.position}
                            register={register}
                        />
                    </div>
                    <Select
                        label="Level"
                        listOption={listOptionLevel}
                        nameSelect={NameRegisterForm.level}
                        register={register}
                    />
                    <SkillDisplayInput resultListSkill={getListSkill} />
                    <button className="w-full h-[42px] rounded bg-[--ColorBgButton] text-white" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
