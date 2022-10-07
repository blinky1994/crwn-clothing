import { ProductCardContainer, Footer, Name, Price}
from './product-card.styles';
import Button, { BUTTON_TYPE_CLASSES }
 from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux';
import { FC } from 'react';
import { CategoryItem } from '../../store/category/category.types'

type ProductCardProps = {
    product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} >Add to Cart</Button>
            </Footer> 
        </ProductCardContainer>
    )
}

export default ProductCard;