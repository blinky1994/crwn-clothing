import { createContext, useState } from 'react';
import PRODUCTS from '../shop-data.json';

// Actual value to access
export const ProductsContext =  createContext({
    prodcts: [],
    setProducts: () => {}
})

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products, setProducts};

    return <ProductsContext.Provider value = {value}>{children}</ProductsContext.Provider>;
}

