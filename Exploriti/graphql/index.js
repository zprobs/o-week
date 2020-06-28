import gql from "graphql-tag";

export const DETAILED_USER_FRAGMENT = gql`
    fragment DetailedUser on user {
        id
        name
        description
        programs {
            programId
            program {
                id
                name
            }
        }
        image
        year
    }
`;

export const GET_DETAILED_USER = gql`
    query getDetailedUser($id: String!) {
        user(id: $id) {
           ...DetailedUser 
        },
        friends(where: {userId: {_eq: $id}}) {
            id
            userId
        }
    }
    ${DETAILED_USER_FRAGMENT}
`;

export const GET_CURRENT_USER = gql`
    query getCurrentUser($id: String!) {
        user(id: $id) {
            ...DetailedUser
            notifications {
                id
                title
            }
        },
        friends(where: {userId: {_eq: $id}}) {
            id
            userId
        }
    }
    ${DETAILED_USER_FRAGMENT}
`;

export const GET_USER_INTERESTS = gql`
    query getUserInterests($id: String!) {
        user(id: $id) {
            id
            interests {
                interestId
                interest {
                    id
                    name
                }
            }
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($data: user_set_input!, $user: user_pk_columns_input!) {
        updateUser(_set: $data, pk_columns: $user) {
            ...DetailedUser
        }
    }
    ${DETAILED_USER_FRAGMENT}
`

export const UPDATE_USER_INTERESTS = gql`
    mutation updateUserInterests($userId: String!, $objects: [userInterest_insert_input!]!) {
        delete_userInterest(where: {userId: {_eq: $userId}}) {
            affected_rows
        }
        insert_userInterest(objects: $objects) {
            affected_rows
            returning {
                user {
                    id
                    interests {
                        interestId
                        interest {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;

export const UPDATE_USER_PROGRAMS = gql`
    mutation updateUserProgras($userId: String!, $objects: [userProgram_insert_input!]!) {
        delete_userProgram(where: {userId: {_eq: $userId}}) {
            affected_rows
        }
        insert_userProgram(objects: $objects) {
            affected_rows
            returning {
                user {
                    id
                    programs {
                        programId
                        program {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;

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

export const GET_USERS_WHERE = gql`
    query getUsersWhere($_nin: [String!]!, $limit: Int = 7) {
        users(where: {id: {_nin: $_nin}}, limit: $limit) {
            id
            image
            name
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
    }
`;

export const GET_USERS_BY_ID = gql`
    query getUsersById($_in: [String!]!) {
        users(where: {id: {_in: $_in}}) {
            id
            image
            name
        }
    }
`;

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

export const GET_USER_FRIENDS = gql`
    query getFriends($userId: String!) {
        friends(where: {userId: {_eq: $userId}}) {
            id
            userId
            friend {
                id
                name
                image
            }
        }
    }
`;

export const REMOVE_FRIEND = gql`
    mutation removeFriend($friendId: String!, $userId: String!) {
        removeFriend(friendId: $friendId, userId: $userId) {
            friendId
            userId
        }
        otherWay: removeFriend(friendId: $userId, userId: $friendId) {
            friendId
            userId
        }
    }
`;

export const CHECK_FRIEND_REQUESTS = gql`
    query checkFriendRequests($currentUser: String!, $otherUser: String!) {
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
    mutation sendFriendRequest($sender: String!, $recipient: String!) {
        sendFriendRequest(object: {sender: $sender, recipient: $recipient}) {
            date
        }
    }
`;

export const DELETE_FRIEND_REQUEST = gql`
    mutation deleteFriendRequest($sender: String!, $recipient: String!) {
        deleteFriendRequest(recipient: $recipient, sender: $sender) {
            date
        }
    }
`;

export const CONFIRM_FRIEND_REQUEST = gql`
    mutation confirmFriendRequest($sender: String!, $recipient: String!) {
        deleteFriendRequest(sender: $sender, recipient: $recipient) {
            recipient
        }
        addFriend(object: {userId: $sender, friendId: $recipient, original: true}) {
            friendId
        }
        otherWay: addFriend(object: {userId: $recipient, friendId: $sender, original: false}) {
            friendId
            userId
        }
    }
`;

export const GET_USER_LINKS = gql`
   query getUserLinks($user: String!) {
       user(id: $user) {
           id
           links
       }
   } 
`;

export const MESSAGE_FRAGMENT = gql`
    fragment DetailedMessage on message {
        _id: id
        text: body
        createdAt: date
        user: sender {
            _id: id
            name
            image
        }
    }
`;

export const GET_CHATS = gql`
    subscription getChats($user: String!) {
        chats(where: {participants: {id: {_eq: $user}}}, limit: 15) {
            _id: id
            name
            participants {
                _id: id
                name
                image
            }
            messages_aggregate {
                aggregate {
                    count
                }
            }
            messages(limit: 15, order_by: {date: desc}) {
                ...DetailedMessage
            }
        }
    }
    ${MESSAGE_FRAGMENT}
`;

export const GET_NEW_MESSAGES = gql`
    subscription getMessages($chatId: Int!, $latestId: Int!) {
        messages(where: {_and: [{chatId: {_eq: $chatId}}, {id: {_gt: $latestId}}]}) {
            ...DetailedMessage
        }
    }
    ${MESSAGE_FRAGMENT}
`;

export const GET_EARLIER_MESSAGES = gql`
    query getEarlierMessages($chatId: Int!, $offset: Int!, $limit: Int!) {
        messages(where: {chatId: {_eq: $chatId}}, offset: $offset, limit: $limit, order_by: {date: desc}) {
            ...DetailedMessage
        }
    }
    ${MESSAGE_FRAGMENT}
`;

export const SEND_MESSAGE = gql`
    mutation sendMessage($chatId: Int!, $senderId: String!, $body: String!) {
        sendMessage(object: {chatId: $chatId, senderId: $senderId, body: $body}) {
            id
        }
    }
`;

/**
 * NULL is a useless query used for when we use the useQuery hook conditionally and need to pass in some sort of gql object
 * @type {DocumentNode}
 */
export const NULL = gql`
    {
        user(id: "0"){
            id
        }
    }
`

