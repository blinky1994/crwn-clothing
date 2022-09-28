import { ProductImage, ProductCardContainer, Footer, Name, Price}
from './product-card.styles';
import Button, { BUTTON_TYPE_CLASSES }
 from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext (CartContext);
    const addProductToCart = () => addItemToCart(product);
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