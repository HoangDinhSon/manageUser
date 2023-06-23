import { iconArrowRight, iconArrowLeft } from '../../assets';
function Hamburger({ children }: any) {
   
    return (
        <div className="flex  bg-[white] fixed top-[20px] right-0 px-[4px] my_hamburger ">
            <input type="checkbox" id="hamburger" className="hidden peer/hamburger" />
            <label
                htmlFor="hamburger"
                className="absolute top-0 bg-[transparent] w-[41px] h-[41px] rounded-[50%]"
            ></label>
            <img
                src={iconArrowRight}
                alt=""
                width="41px"
                height="41px"
                className="hidden peer-checked/hamburger:!block"
            />
            <img src={iconArrowLeft} alt="" width="41px" height="41px" className="peer-checked/hamburger:hidden mr-4" />
            <div className="peer-checked/hamburger:hidden">{children}</div>
        </div>
    );
}

export default Hamburger;
