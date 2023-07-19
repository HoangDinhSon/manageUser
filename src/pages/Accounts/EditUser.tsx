import { useForm } from 'react-hook-form';
import { useState, KeyboardEvent, useEffect } from 'react';
import { useMutation} from 'react-query';
import toast from 'react-hot-toast';
import { editUserBaseOnID } from '~/api/log_time_api';
import { SkillDisplayInput } from '~/components';
import { useGlobalState } from '~/store/Provider';
import { actions } from '~/store';
import {
    ID_FOR_EDIT_DEFAULT,
    LINK_PAGE_ACCOUNT,
    listOptionTeam,
    listOptionLevel,
    listOptionPotion,
} from '~/data/constance_for_page';
import { Select, PhoneNumber, Input, InputWithCharacter } from '~/components';
import { resolverFormAddUser } from './validationForAccountPage';
import {
    NameRegisterForm,
    listBlood,
    listOptionEyeColor,
    listHairColor,
    listGender,
} from '~/data/constance_for_page/constant_type_ui';
import axiosClient from '~/api/axios_client';

function EditUser() {
    const [state, dispatch] = useGlobalState();
    const [listSkill, setListSkill] = useState<Array<string>>([]);
    //check id of user Edit
    if (state.idForEdit === ID_FOR_EDIT_DEFAULT) {
        location.href = `http://localhost:4000${LINK_PAGE_ACCOUNT}`;
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
    } = useForm({
        mode: 'onChange',
        ...resolverFormAddUser,
        defaultValues: async () => {
            try {
                const res = await axiosClient.get(`/users/${state.idForEdit}`).then((res) => res.data);
                const phoneCode = res.phone.slice(0, 3);
                return {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    age: res.age,
                    gender: res.gender,
                    bloodGroup: res.bloodGroup,
                    email: res.email,
                    phoneCodeCountry: phoneCode,
                    phoneNumber: res.phone,
                    birthDate: res.birthDate,
                    university: res.university, 
                    eyeColor: res.eyeColor,
                    hairColor: res.hair.color,
                    team: 'backend',
                    position: 'lead',
                    level: 'senior',
                };
            } catch (error) {
                console.log('some thing wrong edit user 76 >>>', error);
            }
        },
    });
    /* Focus in firstName  */
    useEffect(()=>{
        setFocus(NameRegisterForm.firstName)
    },[setFocus])

    const { mutate } = useMutation({
        mutationFn: editUserBaseOnID,
        onSuccess: (res) => {
            toast.success('edit success wait to back page account');
            dispatch(actions.editUser(res));
            setTimeout(() => {
                window.history.back();
            }, 3000);
        },
        onError: () => {
            toast.error('Fail Update User to Server!!!');
        },
    });

    const handleOnSubmitForm = (formData: any) => {
        if (listSkill.length === 0) {
            toast.error('List Skill không dc để trống');
            document.getElementById('IDlistSkill')?.focus();
            return;
        }
        mutate({
            id: state.idForEdit,
            informationAfterEdit: { ...formData, listSkill: listSkill },
        });
    };
    const getListSkill = (listSkillPayload: Array<string>) => {
        setListSkill(listSkillPayload);
    };
    const handleOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <div className="edit_form ">
            <div className="mx-5 my-7 max-w-[697px]">
                <form action="submit" onSubmit={handleSubmit(handleOnSubmitForm)} onKeyDown={(e) => handleOnKeyDown(e)}>
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-6">
                        <InputWithCharacter
                            label="First Name"
                            numberCharacter={0}
                            register={register}
                            name={NameRegisterForm.firstName}
                            errors={errors}
                        />
                        <InputWithCharacter
                            label="Last Name"
                            numberCharacter={0}
                            register={register}
                            name={NameRegisterForm.lastName}
                            errors={errors}
                        />
                        <InputWithCharacter
                            label="Age"
                            numberCharacter={0}
                            register={register}
                            name={NameRegisterForm.age}
                            errors={errors}
                        />
                        <Select
                            label="Gender"
                            listOption={listGender}
                            nameSelect={NameRegisterForm.gender}
                            register={register}
                        />
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
                        label="Blood Group"
                        listOption={listBlood}
                        nameSelect={NameRegisterForm.bloodGroup}
                        register={register}
                    />
                    <div className="grid grid-cols-2 gap-6 pt-6">
                        <Input
                            content="Birth Date"
                            name={NameRegisterForm.birthDate}
                            register={register}
                            errors={errors}
                        />
                        <InputWithCharacter
                            label="University"
                            numberCharacter={0}
                            register={register}
                            name={NameRegisterForm.university}
                            errors={errors}
                        />
                        <Select
                            label="Eye Color"
                            listOption={listOptionEyeColor}
                            nameSelect={NameRegisterForm.eyeColor}
                            register={register}
                        />
                        <Select
                            label="Hair Color"
                            listOption={listHairColor}
                            nameSelect={NameRegisterForm.hairColor}
                            register={register}
                        />
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
                    <button type="submit" className="w-full h-[42px] rounded bg-[--ColorBgButton] text-white">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EditUser;
