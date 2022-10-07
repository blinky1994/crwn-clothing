import { UserData } from "../../utils/firebase/firebase.utils";
import { AnyAction } from "redux";
import { 
    signInSuccess, 
    signInFailed, 
    signUpFailed, 
    signOutSuccess, 
    signOutFailed
} from "./user.action";

export type UserState = {
    currentUser: UserData | null;
    isLoading: boolean;
    error: Error | null;
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = INITIAL_STATE, action = {} as AnyAction) : UserState=> {
    const { payload } = action;

    if (signInSuccess.match(action)){
        return {
                    ...state,
                    currentUser: payload
                }
    }

    if (signOutSuccess.match(action)) {
        return {
                    ...state,
                    currentUser: null
                }
    }

    if (signOutFailed.match(action)
        || signInFailed.match(action)
        || signUpFailed.match(action)){
            return {
                        ...state,
                        error: payload
                    }
        }

    return state;
}

