import { useForm } from 'react-hook-form';
import { useState, KeyboardEvent } from 'react';
import { useMutation, useQuery } from 'react-query';
import toast from 'react-hot-toast';
import { LinearProgress } from '@mui/material';
import { getUserBaseOnID, editUserBaseOnID } from '../../Api/logTimeApi';
import { SkillDisplayInput } from '../../components';
import { calendar } from '../../assets/icon';
import { useGlobalState } from '../../store/Provider';
import { actions } from '../../store';
import {
    ID_FOR_EDIT_DEFAULT,
    LINK_PAGE_ACCOUNT,
    listOptionTeam,
    listOptionCompany,
    listContractType,
    listOptionLevel,
    listOptionOffice,
    listOptionPotion,
} from '../../data/constance_for_page';
import { Select, PhoneNumber, Input, InputWithCharacter } from '../../components';
import { resolverFormAddUser } from './validationForAccountPage';
import { NameRegisterForm, typeFormAddAndEditAfterChange } from '../../data/constance_for_page/UI_TYPE_CONSTANT';

function EditUser() {
    const [state, dispatch] = useGlobalState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<typeFormAddAndEditAfterChange>(resolverFormAddUser);
    const [listSkill, setListSkill] = useState<Array<string>>([]);
    //check id of user Edit
    if (state.idForEdit === ID_FOR_EDIT_DEFAULT) {
        location.href = `http://localhost:4000${LINK_PAGE_ACCOUNT}`;
    }
    // lấy data từ server và hiển thị
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

    const onSubmitForm = (formData: typeFormAddAndEditAfterChange) => {
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
            {status === 'loading' && (
                <div>
                    <LinearProgress />
                </div>
            )}
            {status === 'error' && <div>error</div>}
            {status === 'success' && (
                <div className="mx-5 my-7 max-w-[697px]">
                    <form action="submit" onSubmit={handleSubmit(onSubmitForm)} onKeyDown={(e) => handleOnKeyDown(e)}>
                        {/* Name */}
                        <div className="grid grid-cols-2 gap-6">
                            <InputWithCharacter
                                label="First Name"
                                numberCharacter={0}
                                register={register}
                                name={NameRegisterForm.firstName}
                                value={data.firstName}
                                errors={errors}
                            />
                            <InputWithCharacter
                                label="Last Name"
                                numberCharacter={0}
                                register={register}
                                name={NameRegisterForm.lastName}
                                value={data.lastName}
                                errors={errors}
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
                            <Input
                                content="Email"
                                name={NameRegisterForm.email}
                                register={register}
                                defaultValue={data.email}
                                errors={errors}
                            />
                            <div className="pt-6">
                                <PhoneNumber
                                    nameCodeCountry={NameRegisterForm.phoneCodeCountry}
                                    namePhoneNumber={NameRegisterForm.phoneNumber}
                                    register={register}
                                    phone={data.phone}
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
                                name={NameRegisterForm.contractEndDate}
                                register={register}
                                errors={errors}
                            />
                            <Select
                                label="Company"
                                listOption={listOptionCompany}
                                nameSelect={NameRegisterForm.company}
                                register={register}
                            />
                            <Select
                                label="Office"
                                listOption={listOptionOffice}
                                nameSelect={NameRegisterForm.office}
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
                        <button className="w-full h-[42px] rounded bg-[--ColorBgButton] text-white">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditUser;
