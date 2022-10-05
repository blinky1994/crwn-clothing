import { CartItemContainer, ItemText, ItemDetails } from './cart-item.styles';
import { CartItem as TCartITem } from '../../store/cart/cart.types';
import { FC, memo } from 'react';

export type CartItemProps = {
    cartItem: TCartITem;
}

const CartItem : FC<CartItemProps> = memo(({ cartItem }) => {
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
});

export default CartItem;