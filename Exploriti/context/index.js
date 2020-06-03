import React, { createContext} from 'react';
import Error from '../components/ReusableComponents/Error';

/**
 * The Context which contains the data of the current user. Created using useReducer()
 * @field userState
 * @field userReducer
 * @type {React.Context<null>}
 */
export const UserContext = createContext(null);

/**
 * The Context which contains the Firebase information about the current user. Contains object 'authState' which will have a value 'status' to
 * determine weather the user is 'loading', 'in' or 'out'. It also contains an object 'user' which has property of 'uid', the current user's ID.
 * @field authState
 * @field setAuthState
 * @type {React.Context<null>}
 */
export const AuthContext = createContext(null);


/**
 * The reducer for the UserContext data. Used to perform actions on the current logged in user.
 * @param state The current state of user.
 * @param action The desired action to take place. Possible options are: 'updateProfile',
 */
export function userReducer(state, action) {
    switch(action.type) {
        case 'updateProfile':
            const {fields} = action;
            const newState = {};
            Object.values(fields).forEach((value) => {
                newState[value.name] = value.value;
            });
            return {...state, ...newState };
        default:
            console.log('reducer error invalid');
            throw new Error();
    }
}








