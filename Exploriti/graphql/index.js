import gql from "graphql-tag";

export const GET_USER = gql`
    query getUser($id: String!) {
        user(id: $id) {
            name
            description
            programs {
                program {
                    id
                    name
                }
            }
            image
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($data: user_set_input!, $user: user_pk_columns_input!) {
        updateUser(_set: $data, pk_columns: $user) {
            description
        }
    }
`

export const SIGN_UP = gql`
    mutation SIGN_UP($data: user_insert_input!) {
        createUser(object: $data) {
            name
        }
    }
`;

export const GET_ALL_USERS = gql`
    query GET_ALL_USERS {
        users{
            id
            name
            image
        }
    }`;
