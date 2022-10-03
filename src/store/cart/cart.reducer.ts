import { AnyAction } from "redux";
import { setCartItems, setIsCartOpen } from "./cart.action";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";

export type CartState = {
    isCartOpen: boolean,
    cartItems: CartItem[],
}

const CART_INITIAL_STATE : CartState= {
    isCartOpen: false,
    cartItems: [],
}

export const cartReducer = (
    state = CART_INITIAL_STATE, 
    action = {} as AnyAction
    ) : CartState => {

    if (setIsCartOpen.match(action)) {
        return {
            ...state,
            isCartOpen: action.payload,
        };
        }
    
        if (setCartItems.match(action)) {
        return {
            ...state,
            cartItems: action.payload,
        };
        }
    
        return state;
}