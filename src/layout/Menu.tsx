function Menu({ children }:any) {
    return (
        <div className="flex">
            <div className="h-screen w-[78px] bg-[#D2D2D2]  fixed top-0">Menu</div>
            <div className="pl-[78px]">{children}</div>
        </div>
    );
}

export default Menu;
