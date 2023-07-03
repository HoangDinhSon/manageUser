import { useState, useRef } from 'react';
import { Button } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import { cloudComputer, icondot, closeSmall, IconcancelInFromDetaile } from '../../assets';
import { actions } from '../../store';
import { useGlobalState } from '../../store/Provider';
import { LINK_PAGE_ACCOUNT } from '../../data/constance_for_page';
function RequirementFileUI() {
    return (
        <>
            <p className="font-medium">Requirement</p>
            <ul className="ml-3">
                <li className="flex">
                    <img src={icondot} width="5px" className="mr-2" />
                    <span>Only csv,excel,xlsx</span>
                </li>
                <li className="flex">
                    <img src={icondot} width="5px" className="mr-2" />
                    <span>File can not exceed 5MB</span>
                </li>
            </ul>
        </>
    );
}

function ImportForm() {
    const [listFile, setListFile] = useState<Array<any>>([]);
    const refInput = useRef(null);
    const [state, dispatch] = useGlobalState();
    const refInputForChange: any = refInput?.current;
    // Save File import into Array listFile
    if (refInput.current != null) {
        refInputForChange.addEventListener('change', (event: any) => {
            const ListFile: Array<any> = Object.values(event.target.files);
            setListFile([...ListFile]);
        });
    }
    const removeFile = (index: number) => {
        refInputForChange.value = null;
        setListFile((preState: Array<any>) => {
            preState.splice(index, 1);
            return [...preState];
        });
    };
    const handleCloseImportForm = () => {
        dispatch(actions.toggleImportForm());
    };
    const handleSubmitForm = (e: any) => {
        e.preventDefault();
        if (listFile.length === 0) {
            toast.error('you must import File');
        } else {
            dispatch(actions.toggleImportForm());
            location.href = `http://localhost:4000${LINK_PAGE_ACCOUNT}`;
        }
        // 
    };

    return (
        <section className="import_form fixed   top-0 bottom-0 left-0 right-0 z-10">
            <Toaster />
            <form action="" onSubmit={(e) => handleSubmitForm(e)}>
                <div className="fixed top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-[523px]  bg-white rounded-2xl px-6 py-8 xs_max:w-[calc(100vw-8px)]">
                    <div className="flex justify-between">
                        <h4 className="h4_lean_100">Import file</h4>
                        <img
                            src={IconcancelInFromDetaile}
                            alt=""
                            width={'18px'}
                            onClick={handleCloseImportForm}
                            className="object-fill cursor-pointer"
                        />
                    </div>
                    <div className="bg-[#F5F5F5] py-[62px] mt-[35px] text-center  my_border_dashed text-[#666666] relative">
                        <label
                            htmlFor="upload_file"
                            className="absolute right-0 top-0  w-full h-full bg-transparent"
                        ></label>
                        <img src={cloudComputer} alt="" className="w-16 mx-[auto] " />
                        <h4 className="h4_lean_100 pt-5">Drag your csv here</h4>
                        <p className="pt-3">or, click to select a csv file</p>
                    </div>
                    <div className="pt-3">
                        <RequirementFileUI />
                    </div>
                    <input
                        type="file"
                        name="upload"
                        id="upload_file"
                        className="hidden"
                        multiple
                        ref={refInput}
                        accept=".csv,.excel,.xlsx,.img ,.png,.mp4"
                    />
                    <div className="total_file py-3">
                        <ul className="flex items-center  overflow-auto flex-wrap">
                            {listFile &&
                                listFile.map((element, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center my_outline_rounded_edit_form rounded-[8px] px-2 "
                                        >
                                            <li>{element.name}</li>
                                            <img
                                                src={closeSmall}
                                                alt=""
                                                className="hover:cursor-pointer"
                                                width={'20px'}
                                                onClick={() => removeFile(index)}
                                            />
                                        </div>
                                    );
                                })}
                        </ul>
                    </div>
                    <Button variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default ImportForm;
