import {createContext, useEffect, useReducer } from 'react';

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

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: `SET_CART_ITEMS`,
    ADD_CART_ITEM: `ADD_CART_ITEM`,
    REMOVE_CART_ITEM: `REMOVE_CART_ITEM`,
    CLEAR_CART_ITEM: `CLEAR_CART_ITEM`
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS: 
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}

export const CartProvider = ({children}) => {
    const [ {cartCount, cartTotal, cartItems, isCartOpen} , dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const setCartCount = (newCartItems) => {
        const payload = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        dispatch( { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartCount: payload } })
    }
    const setCartTotal = (newCartItems) => {
        const payload = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        dispatch( { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartTotal: payload } })
    }

    const addItemToCart = (productToAdd) => {
        const payload = addCartItem(cartItems, productToAdd);
        dispatch( { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: payload }})
    }

    const removeItemFromCart = (productToRemove) => {
        const payload = removeCartItem(cartItems, productToRemove);
        dispatch( { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: payload }})
    }

    const clearItemFromCart = (productToClear) => {
        const payload = clearCartItem(cartItems, productToClear);
        dispatch( { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { cartItems: payload }})
    }

    const setIsCartOpen = (isOpen) => {
        dispatch( { type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: { isCartOpen: isOpen }})
    }

    useEffect(() => {
        const updateCartItemsReducer = (newCartItems) => {
            setCartCount(newCartItems)
            setCartTotal(newCartItems);
        }

        updateCartItemsReducer(cartItems);
    }, [cartItems])
    

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, 
        removeItemFromCart, clearItemFromCart, cartCount, cartTotal };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}