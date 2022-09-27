import { createContext, useState, useEffect } from 'react';
import { getCategoriesAndDocuments, addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
// import SHOP_DATA from '../shop-data';

// Actual value to access
export const CategoriesContext =  createContext({
    categoriesMap: {},
    setProducts: () => {}
})

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    //FOR ADDING SHOPDATA TO FIREBASE, ONLY IF DB IS EMPTY
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

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

