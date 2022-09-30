import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";

export const setIsCartOpen = boolean => 
createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

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