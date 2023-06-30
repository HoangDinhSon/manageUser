import { useState } from 'react';
import { TableAnimation } from '../components';
import { FormControlLabel, Checkbox } from '@mui/material';

function FilterUser() {
    // sau khi mount
    const [value, setValue]= useState<boolean>(true);
    const handleOnChange= (e:any)=>{
        console.log('value of CheckBox >>>', e.target.checked);
        setValue( e.target.checked)
        
        // setValue((preState)=>{
        //         return (!preState)
        // })

    }
    return (
        <div className='pt-[30px]'>
            <FormControlLabel
                label="label"
                control={<Checkbox  onChange={(e)=>handleOnChange(e) } checked={value}></Checkbox>}
            />
        </div>
    );
}

export default FilterUser;
