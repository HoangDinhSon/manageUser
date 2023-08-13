import { useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';

function BreadCrumbContent() {
    const location = useLocation();
    const { pathname } = location;
    const listLink = pathname.match(/[a-z]+/g);//[/account,/all/,vinova]
    return (
        listLink && (
            <Breadcrumbs>
                {listLink.map((page, index) => (
                    <Typography
                        key={index}
                        color="black"
                        sx={{
                            fontSize: '26px',
                        }}
                    >
                        {page.toUpperCase()}{' '}
                    </Typography>
                ))}
            </Breadcrumbs>
        )
    );
}
export default BreadCrumbContent;
