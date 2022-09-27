import { CartItemContainer, ItemText, ItemDetails } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;

    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`}/>
            <ItemDetails className='item-details'>
                <ItemText>{name}</ItemText>
                <ItemText>{quantity} x ${price}</ItemText>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem