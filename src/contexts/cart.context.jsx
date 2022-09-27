import {createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const checkIfExists = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    if (checkIfExists){
        return cartItems.map(cartItem => {
            return cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} :
            cartItem;
        })
    }
    return [...cartItems, {...productToAdd, quantity: 1 }];
}
const removeCartItem = (cartItems, cartItemToRemove) => {
    // Find the cart item to remove
    const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    // Check if quantity is equal to 1, then remove
    if (existingItem){
        if (existingItem.quantity === 1){
            return cartItems.filter(cartItem => cartItem.id !== existingItem.id)
        } 
        
        return cartItems.map(cartItem => {
            return cartItem.id === cartItemToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1} :
            cartItem;
        })
    }
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, 
        removeItemFromCart, clearItemFromCart, cartCount, cartTotal };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}