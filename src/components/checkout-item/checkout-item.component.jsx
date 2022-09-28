import { CheckoutItemContainer, ImageContainer, ItemDetails, Quantity,
Arrow, Value, RemoveButton} from './checkout-item.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({cartItem}) => {
const { name, imageUrl, price, quantity } = cartItem;
const { clearItemFromCart, addItemToCart, removeItemFromCart  } = useContext(CartContext);

const clearItemHandler = () => clearItemFromCart(cartItem);
const addItemHandler = () => addItemToCart(cartItem);
const removeItemHandler = () => removeItemFromCart(cartItem);

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