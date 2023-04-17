import { AppBar, Toolbar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderButton } from './styled';
import Login from 'components/Login/Login';

const Header = () => {
   return (
      <AppBar position='static'>
         <Toolbar>
            <HeaderButton color='inherit' component={Link} to='/'>
               Home
            </HeaderButton>
            <HeaderButton color='inherit' component={Link} to='/expenses'>
               Expenses
            </HeaderButton>
            <Login />
         </Toolbar>
      </AppBar>
   );
};

export default Header;