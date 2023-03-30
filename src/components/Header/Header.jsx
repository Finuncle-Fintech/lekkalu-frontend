import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import { HeaderButton } from './styled';
import Signin from 'components/Signin/Signin';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <HeaderButton color="inherit" component={Link} to="/">
          Home
        </HeaderButton>
        <HeaderButton color="inherit" component={Link} to="/expenses">
          Expenses
        </HeaderButton>
        <Signin/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
