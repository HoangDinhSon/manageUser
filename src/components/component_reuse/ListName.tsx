import { closeSmall } from '../../assets';
type typeOfComponentListName = {
    listName: Array<string>;
    onClick: any
};
function ListName({ listName, onClick }: typeOfComponentListName) {
    return (
        <div className="my_outline_rounded_edit_form h-[42px] overflow-auto">
            <ul className="flex items-center h-[42px] ">
                {listName.map((element: any, index: any) => {
                    return (
                        <div
                            className=" flex bg-[--outlineColor] mx-1 rounded-[8px] px-2 text-[12px] hover:cursor-pointer"
                            key={index}
                            onClick={onClick}
                        >
                            <img src={closeSmall} alt="" />
                            <li>{element}</li>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}

export default ListName;
