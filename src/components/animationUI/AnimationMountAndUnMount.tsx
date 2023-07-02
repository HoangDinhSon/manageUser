/* 
tạo ra một animation khi một component bị mount and unmount dùng scale  
*/

function AnimationMountAndUnMount({ isMount, children }: { isMount: boolean; children: any }) {
    const classWhenMount =
        'fixed z-20 top-0 left-0 bg-[--bgAnimation]  w-full h-full    transition-all duration-[1s] scale-x-100 translate-x-0';
    const classWhenUnmount =
        'fixed z-20 top-0 left-0 bg-[--bgAnimation]  w-full h-full   transition-all duration-[1s] scale-x-0  translate-x-full';
    return <div className={isMount ? classWhenMount : classWhenUnmount}>{children}</div>;
}

export default AnimationMountAndUnMount;
