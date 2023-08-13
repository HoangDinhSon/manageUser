import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

const MenuIconStyled = styled(MenuIcon)((props) => ({
    color: 'black',
    margin: '0 20px 0 5px',
    '&:hover': { color: 'red' },
    cursor: 'pointer',
}));
export default MenuIconStyled

/* 
options.shouldForwardProp ((prop: string) => bool [optional]): Indicates whether the prop should be forwarded to the Component.

*/
