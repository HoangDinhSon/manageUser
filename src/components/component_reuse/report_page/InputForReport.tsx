import { useController } from 'react-hook-form';
import { NAME } from '~/data/type/typeGlobal';
type PropsInputReport = {
    label: string;
    name: string;
    control: any;
    errors: any;
};

function InputForReport({ label, name, control, errors }: PropsInputReport) {
    const { field } = useController({
        name: name,
        control: control,
    });
    let isFocus = false;
    if (name === NAME.text) {
        isFocus = true;
    }

    return (
        <div>
            {name === NAME.complete ? (
                <div className="flex items-center pl-4 border border-black rounded-lg dark:border-gray-700 mt-4 h-[50px]">
                    <input
                        id={name}
                        type="checkbox"
                        name={field.name}
                        onChange={field.onChange}
                        className="checkbox_report"
                        checked={!!field.value}
                    />
                    <label htmlFor={name} className="label_checkbox_report unselectable">
                        {label}
                    </label>
                </div>
            ) : (
                <>
                    <label htmlFor={name} className="cursor-pointer py-[5px] block pl-4">
                        {label}
                    </label>
                    <input
                        id={name}
                        type="text"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        className="input_for_report"
                        autoFocus={isFocus}
                    />
                </>
            )}
            {errors[name] && <span>{errors[name].message}</span>}
        </div>
    );
}
export default InputForReport;
