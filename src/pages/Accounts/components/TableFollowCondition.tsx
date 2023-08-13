// import { Fragment } from 'react';
// import { useKindOfTable } from '~/custome_hook';
// import { TableUser } from '~/components/accounts/TableUser';
// import { TableForUser } from '~/components';
// import { useGlobalState } from '~/store/Provider';
// function TableFollowCondition() {
//     const [state] = useGlobalState();
//     const kindOfTable = useKindOfTable();
//     return (
//         <Fragment>
//             <div className={kindOfTable==="all"?"block":"w-0 h-0 overflow-hidden"}>
//                 <TableUser />
//             </div>
//             <div className={kindOfTable==="vinova"?"block":"w-0 h-0 overflow-hidden"}>
//                 <TableForUser listUser={state.resApi.users} kindOfTable="vinova" numberOfUser={100} />
//             </div>
//             <div className={kindOfTable==="partner"?"block":"w-0 h-0 overflow-hidden"}>
//                 <TableForUser listUser={state.resApi.users} kindOfTable="partner" numberOfUser={80} />
//             </div>
//         </Fragment>
//     );
// }

// export default TableFollowCondition;
