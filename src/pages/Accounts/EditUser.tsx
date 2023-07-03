import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
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

function EditUser() {
    const [state, dispatch] = useGlobalState();
    const { register, handleSubmit } = useForm();
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
            dispatch(actions.editUser(res));
            window.history.back();
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
            {status === 'loading' && (
                <div>
                    <LinearProgress />
                </div>
            )}
            {status === 'error' && <div>error</div>}
            {status === 'success' && (
                <div className="mx-5 my-7 max-w-[697px]">
                    <form action="submit" onSubmit={handleSubmit(onSubmitForm)}>
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
                        <button className="w-full h-[42px] rounded bg-[--ColorBgButton] text-white">Save</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EditUser;
