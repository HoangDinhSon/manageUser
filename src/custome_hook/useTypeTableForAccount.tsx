import { useKindOfTable } from '~/custome_hook';
import { TableUser } from '~/components/accounts/TableUser';
import { TableForUser } from '~/components';
import { useGlobalState } from '~/store/Provider';

function useTypeTableForAccount() {
    const [state] = useGlobalState();
    const kindOfTable = useKindOfTable();
    kindOfTable === 'all' && <TableUser />;
    kindOfTable === 'vinova' && <TableForUser listUser={state.resApi.users} kindOfTable="vinova" numberOfUser={100} />;
    kindOfTable === 'partner' && <TableForUser listUser={state.resApi.users} kindOfTable="partner" numberOfUser={80} />;

    // switch (kindOfTable) {
    //     case 'all':
    //         return;
    //     case 'vinova':
    //         return <div></div>;
    //     case 'partner':
    //         return <></>;
    //     default:
    //         return '';
    // }
}

export default useTypeTableForAccount;
/* 
useTypeTableForAccount return: 
 "" || <TableUser />||<TableForUser kindOfTable="vinova" />||<TableForUser kindOfTable="partner" />
*/
