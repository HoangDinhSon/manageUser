import { Button, TextField } from '@mui/material';
import { TableUser } from '../components/accounts/TableUser';
import dummyDatauser from '../dummydata';
import { filterbutton, iconSearch } from '../assets/icon';

function Accounts() {
    return (
        <section className="pt-[98px] pl-[98px] pr-[20px]">
            <div className="bg-white rounded-[12px] p-8">
                <div className="nav_for_table flex gap-1 h-[54px] items-end   border-b border-[#EBEBEB]">
                    <p className="w-[44px] h-[40px] leading-[40px] text-center text-[#5E90F0]  border-b-4 border-[#5E90F0]">
                        All
                    </p>
                    <p className="w-[75px] h-[40px] leading-[40px]  text-center text-[#9DA7B9]">Vinova</p>
                    <p className="w-[44px] h-[40px] leading-[40px]  text-center text-[#9DA7B9]">Patner</p>
                </div>
                <div className="search_filter h-[97px] pt-[29px]">
                    <TextField
                        placeholder="Search"
                        InputProps={{ startAdornment: <img src={iconSearch} alt="" className="pr-2" /> ,
                        style:{
                            height:"40px"
                        }
                    }}
                    />
                    <Button sx ={{height:"40px"}}>
                        <img src={filterbutton} alt="" />
                    </Button>
                </div>
                <TableUser listUser={dummyDatauser} />
            </div>
        </section>
    );
}

export default Accounts;
