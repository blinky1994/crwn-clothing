import { createContext, useState, useEffect } from 'react';
import SHOP_DATA from '../shop-data.js';
import PRODUCTS from '../shop-data.js';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

// Actual value to access
export const CategoriesContext =  createContext({
    categoriesMap: {},
    setProducts: () => {}
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, [])

    const value = { categoriesMap, setCategoriesMap};

    return <CategoriesContext.Provider value = {value}>{children}</CategoriesContext.Provider>;
}

