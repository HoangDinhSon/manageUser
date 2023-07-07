import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useState, KeyboardEvent ,useEffect} from 'react';
import { addUserToServer } from '../../Api/logTimeApi';
import { InputWithCharacter, Select, Input, PhoneNumber, SkillDisplayInput } from '../../components';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
import { listOptionTeam, listOptionLevel, listOptionPotion } from '../../data/constance_for_page';
import { resolverFormAddUser } from './validationForAccountPage';
import {
    NameRegisterForm,
    typeFormAddAndEditAfterChange,
    DEFAULT_VALUE_fORM_ADD,
    listBlood,
    listGender,
    listOptionEyeColor,
    listHairColor,
} from '../../data/constance_for_page/UI_TYPE_CONSTANT';

function AddUser() {
    const [, dispatch] = useGlobalState();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setFocus,
    } = useForm<typeFormAddAndEditAfterChange>({ ...resolverFormAddUser, defaultValues: DEFAULT_VALUE_fORM_ADD });
    const [listSkill, setListSkill] = useState<Array<string>>([]);
    const { mutate } = useMutation({
        mutationFn: addUserToServer,
        onSuccess: (res) => {
            reset(DEFAULT_VALUE_fORM_ADD); // reset lại các giá trị mặc định cho form
            dispatch(actions.addNewUser(res));
            toast.success('Add to server success');
            listSkill.length = 0; // xóa hết phần tử trong mảng
        },
        onError: () => {
            toast.error('can not send inform user to server');
        },
    });
    /* the function run base useEffect in component  SkillDisplayInput */
    const getListSkill = (listSkillPayload: any) => {
        setListSkill(listSkillPayload);
    };
    const firstName:any= NameRegisterForm.firstName
    useEffect(()=>{
        setFocus(firstName)
    },[setFocus])
    const handleOnSubmitForm = (formData: typeFormAddAndEditAfterChange) => {
        if (listSkill.length === 0) {
            toast.error('List Skill không dc để trống ');
            document.getElementById('IDlistSkill')?.focus();
            return;
        }
        mutate({
            ...formData,
            listSkill: listSkill,
        });
    };
    /* prevent default of Enter () */
    const handleOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    /*  get date today  */

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
                        <Input
                            content="Email"
                            name={NameRegisterForm.email}
                            register={register}
                            errors={errors}
                           
                        />
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
                    <button className="w-full h-[42px] rounded bg-[--ColorBgButton] text-white" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
