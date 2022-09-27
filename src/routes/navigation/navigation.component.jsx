import { Outlet } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';
import  { NavigationContainer, LogoContainer, NavLinks, NavLink } 
from './navigation.styles';

export const CartIcona = (<CartIcon />);

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
            </LogoContainer>
            <NavLinks>
                <NavLink className='nav-link' to='/shop'>
                    Catalog
                </NavLink>
                {
                    currentUser ? <NavLink as='span' className='nav-link' onClick={signOutUser}>Sign Out</NavLink> 
                    :
                    <NavLink className='nav-link' to='/auth'>
                    Sign In
                    </NavLink>
                }
                <CartIcon /> 
            </NavLinks>
            {isCartOpen && <CartDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    )
}

export default Navigation;