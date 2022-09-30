import { ProductImage, ProductCardContainer, Footer, Name, Price}
from './product-card.styles';
import Button, { BUTTON_TYPE_CLASSES }
 from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { useDispatch } from 'react-redux';

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const { name, price, imageUrl } = product;
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
    const altText = `${name}`;
    return (
        <ProductCardContainer>
            <ProductImage imageUrl={imageUrl} alt={altText}/>
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart} >Add to Cart</Button>
            </Footer> 
        </ProductCardContainer>
    )
}

export default ProductCard;