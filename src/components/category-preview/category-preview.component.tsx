import { Title, Preview, CategoryPreviewContainer } from './category-preview.styles';
import ProductCard from '../product-card/product-card.component';
import { FC } from 'react';
import { CategoryItem } from '../../store/category/category.types';

export type CategoryPreviewProps = {
    title: string;  
    products: CategoryItem[];
}

const CategoryPreview: FC<CategoryPreviewProps> = ({title, products}) => {
  return (
    <CategoryPreviewContainer>
        <h2>
            <Title to={title}>{title.toUpperCase()}</Title>
        </h2>
        <Preview>
            {
                products.filter((_, index) => index < 4)
                .map(product => (
                    <ProductCard key={product.id} product={product}></ProductCard>
                ))
            }
        </Preview>
    </CategoryPreviewContainer>
  )
}

export default CategoryPreview