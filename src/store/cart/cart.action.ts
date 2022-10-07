import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../category/category.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
    // Find the cart item to remove
    const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    // Check if quantity is equal to 1, then remove
    if (existingItem && existingItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== existingItem.id)
    } 
        
    return cartItems.map(cartItem => {
        return cartItem.id === cartItemToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1} :
        cartItem;
    })
}

const clearCartItem = (cartItems: CartItem[], cartItemToClear: CartItem) : CartItem[] => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export type SetIsCartOpen = 
ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = 
ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((boolean: boolean) => 
createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]) : SetCartItems =>
 createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems))

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
}

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
}

export const clearItemFromCart = (cartItems: CartItem[], productToClear: CartItem) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return setCartItems(newCartItems);
}