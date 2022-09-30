import { CheckoutItemContainer, ImageContainer, ItemDetails, Quantity,
Arrow, Value, RemoveButton} from './checkout-item.styles';
import { 
    clearItemFromCart,
    addItemToCart,
    removeItemFromCart
} from '../../store/cart/cart.action';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux';

const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, price, quantity } = cartItem;
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
    <CheckoutItemContainer>
        <ImageContainer>
            <img src={imageUrl} alt={`${name}`}></img>
        </ImageContainer>
        <ItemDetails>{name}</ItemDetails>
        <Quantity>
            <Arrow onClick={removeItemHandler}>
                &#10094;
            </Arrow>
              <Value>{quantity}</Value>
            <Arrow onClick={addItemHandler}>
                &#10095;
            </Arrow>    
        </Quantity>
        <ItemDetails>{price}</ItemDetails>
        <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  )
}

export default CheckoutItem;