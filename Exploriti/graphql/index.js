import gql from "graphql-tag";

export const DETAILED_USER_FRAGMENT = gql`
    fragment DetailedUser on user {
        id
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
`

export const GET_DETAILED_USER = gql`
    query getUser($id: String!) {
        user(id: $id) {
           ...DetailedUser 
        }
    }
    ${DETAILED_USER_FRAGMENT}
`;

export const GET_CURRENT_USER = gql`
    query getUser($id: String!) {
        user(id: $id) {
            ...DetailedUser
            notifications {
                id
                title
            }
        }
    }
    ${DETAILED_USER_FRAGMENT}
`;

export const UPDATE_USER = gql`
    mutation updateUser($data: user_set_input!, $user: user_pk_columns_input!) {
        updateUser(_set: $data, pk_columns: $user) {
            ...DetailedUser
        }
    }
    ${DETAILED_USER_FRAGMENT}
`

export const SIGN_UP = gql`
    mutation SIGN_UP($data: user_insert_input!) {
        createUser(object: $data) {
            ...DetailedUser
        }
    }
    ${DETAILED_USER_FRAGMENT}
`;

export const GET_ALL_USERS = gql`
    query GET_ALL_USERS {
        users {
            id
            name
            image
        }
    }
`;

export const GET_PAGINATED_USERS = gql`
    query GET_PAGINATED_USERS($limit: Int!) {
        users(limit: $limit) {
            id
            name
            image
        }
    }`
;


export const GET_INTERESTS = gql`
    query GET_INTERESTS {
        interests(order_by: {name: asc}) {
            id
            name
            aliases
        }
    }
`;

export const GET_PROGRAMS = gql`
    query GET_PROGRAMS {
        programs(order_by: {name: asc}) {
            id
            name
        }
    }
`;

export const CHECK_FRIEND_REQUESTS = gql`
    query CHECK_FRIEND_REQUESTS($currentUser: String!, $otherUser: String!) {
        user(id: $currentUser, ) {
            friendRequestsSent(where: {recipient: {_eq: $otherUser}}) {
                date 
            }
            friendRequestsReceived(where: {sender: {_eq: $otherUser}}) {
                date 
            }
        }
    }
`;

export const SEND_FRIEND_REQUEST = gql`
    mutation SEND_FRIEND_REQUEST($sender: String!, $recipient: String!) {
        sendFriendRequest(object: {sender: $sender, recipient: $recipient}) {
            date
        }
    }
`;

export const DELETE_FRIEND_REQUEST = gql`
    mutation DELETE_FRIEND_REQUEST($sender: String!, $recipient: String!) {
        deleteFriendRequest(recipient: $recipient, sender: $sender) {
            date
        }
    }
`;