import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import  { NavigationContainer, LogoContainer, NavLinks, NavLink } 
from './navigation.styles';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

export const CartIcona = (<CartIcon />);
const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);

    const isCartOpen = useSelector(selectIsCartOpen);

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