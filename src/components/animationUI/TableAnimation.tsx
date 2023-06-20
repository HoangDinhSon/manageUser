function TableAnimation() {
    function TableRowForHeader() {
        return (
            <tr className="text-center">
                <td>
                    <div className="w-[20px]">
                        <input type="checkbox" />
                    </div>
                </td>
                <td>
                    <div className="flex justify-between w-[86px]">
                        <span>ID</span>
                    </div>
                </td>
                <td>
                    <div className="flex justify-between w-[94px]">
                        <span>First Name</span>
                    </div>
                </td>
                <td>
                    <div className="flex justify-between w-[94px]">
                        <span>Alias</span>
                    </div>
                </td>
                <td>
                    <div className="flex justify-between w-[154px]">
                        <span>Email</span>
                    </div>
                </td>
                <td>
                    <div className="flex justify-between w-[94px]">
                        <span>Team</span>
                    </div>
                </td>
                <td>
                    <div className="flex justify-between w-[94px]">
                        <span>Company</span>
                    </div>
                </td>
                <td>
                    <div className="flex justify-between w-[94px]">
                        <span>Position</span>
                    </div>
                </td>
                <td>
                    <div className="flex justify-between w-[94px]">
                        <span>Role</span>
                    </div>
                </td>
                <td>
                    <div className="flex justify-between w-[94px]">
                        <span>Status</span>
                    </div>
                </td>
                <td colSpan={2}>
                    <div className="w-[94px] flex justify-between">
                    </div>
                </td>
            </tr>
        );
    }
    return ( 
        <div>
            <TableRowForHeader/>
            <TableRowForHeader/>
            <TableRowForHeader/>
            <TableRowForHeader/>
            <TableRowForHeader/>
            <TableRowForHeader/>
        </div>
     );
}

export default TableAnimation;