import { iconArrowRight, iconArrowLeft } from '../../assets';

//type children : là một ReactElement
function Hamburger({ children }: any) {
    // const id = useId();
    return (
        <div className="flex">
                <input type="checkbox" id="hamburger" className="hidden peer/hamburger" />
            <label htmlFor="hamburger">
                <img src={iconArrowRight} alt="" width="41px" height="41px" className="hidden peer-checked/hamburger:!block" />
                <img src={iconArrowLeft} alt="" width="41px" height="41px" className="peer-checked/hamburger:hidden" />
            </label>
            <div className="peer-checked/hamburger:hidden">{children}</div>
        </div>
    );
}

export default Hamburger;
