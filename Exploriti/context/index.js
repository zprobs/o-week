import React, { createContext } from "react";

/**
 * The Context which contains the Firebase information about the current user. Contains object 'authState' which will have a value 'status' to
 * determine weather the user is 'loading', 'in' or 'out'. It also contains an object 'user' which has property of 'uid', the current user's ID.
 * @field authState
 * @field setAuthState
 * @type {React.Context<null>}
 */
export const AuthContext = createContext(null);

/**
 * A Method to prepare a list of interests or programs for the GraphQL server
 * @param list
 * @param term
 * @returns {{data: {id: value}}}
 * @author Salman Shahid
 */
export const graphqlify = (list, term) => {
    const id = term + 'Id';
    let dict = {};
    dict['data'] = list.map(value => {
        let empty = {};
        empty[id] = value;
        return empty;
    });
    return dict;
};

export const yearsData = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Graduate School'];
export const facultiesData = ['ABC', 'EFG', 'HIJ'];
