import gql from 'graphql-tag';

/**
 * To get new Schema :
 * gq https://exploriti-backend.herokuapp.com/v1/graphql -H 'X-Hasura-Admin-Secret: Liv7RYcLeKFPFuW4pJHX' --introspect > schema.graphql
 **/
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
    member_aggregate {
      aggregate {
        count
      }
    }
    friends_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const GET_DETAILED_USER = gql`
  query getDetailedUser($id: String!) {
    user(id: $id) {
      ...DetailedUser
    }
  }
  ${DETAILED_USER_FRAGMENT}
`;

export const GET_NOTIFICATIONS = gql`
  query getNotifications($id: String!) {
    user(id: $id) {
      id
      notifications {
        id
        timestamp
        type
        typeId
        seen
      }
    }
  }
`;

export const SEE_NOTIFICATION = gql`
  mutation seeNotification($id: Int!) {
    update_notification(where: { id: { _eq: $id } }, _set: { seen: true }) {
      returning {
        id
        seen
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($id: String!) {
    user(id: $id) {
      ...DetailedUser
      isAdmin
      notifications {
        id
        timestamp
        type
        typeId
        seen
      }
      member {
        isOwner
        group {
          id
        }
      }
    }
  }
  ${DETAILED_USER_FRAGMENT}
`;

export const CHECK_USER_ADMIN = gql`
  query checkUserAdmin($id: String!) {
    user(id: $id) {
      id
      isAdmin
    }
  }
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
            aliases
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
`;

export const UPDATE_USER_INTERESTS = gql`
  mutation updateUserInterests(
    $userId: String!
    $objects: [userInterest_insert_input!]!
  ) {
    delete_userInterest(where: { userId: { _eq: $userId } }) {
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
  mutation updateUserProgras(
    $userId: String!
    $objects: [userProgram_insert_input!]!
  ) {
    delete_userProgram(where: { userId: { _eq: $userId } }) {
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

export const SEND_NOTIFICATION = gql`
  mutation sendNotification(
    $recipient: String!
    $type: String!
    $typeId: String!
  ) {
    sendNotification(
      object: {
        type: $type
        typeId: $typeId
        userNotifications: { data: { userId: $recipient } }
      }
    ) {
      id
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
    users(where: { id: { _nin: $_nin } }, limit: $limit) {
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
    users(where: { id: { _in: $_in } }) {
      id
      image
      name
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($id: String!) {
    user(id: $id) {
      id
      image
      name
    }
  }
`;

export const GET_INTERESTS = gql`
  query GET_INTERESTS {
    interests(order_by: { name: asc }) {
      id
      name
      aliases
    }
  }
`;

export const GET_PROGRAMS = gql`
  query GET_PROGRAMS {
    programs(order_by: { name: asc }) {
      id
      name
    }
  }
`;

export const GET_USER_FRIENDS = gql`
  query getFriends($userId: String!) {
    friends(where: { userId: { _eq: $userId } }) {
      userId
      id
      name
      image
    }
  }
`;

export const GET_USER_FRIENDS_ID = gql`
  query getFriendsID($userId: String!) {
    friends(where: { userId: { _eq: $userId } }) {
      userId
      id
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
    user(id: $currentUser) {
      friendRequestsSent(where: { recipient: { _eq: $otherUser } }) {
        date
      }
      friendRequestsReceived(where: { sender: { _eq: $otherUser } }) {
        date
      }
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation sendFriendRequest($sender: String!, $recipient: String!) {
    sendFriendRequest(object: { sender: $sender, recipient: $recipient }) {
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
    addFriend(
      object: { userId: $sender, friendId: $recipient, original: true }
    ) {
      friendId
    }
    otherWay: addFriend(
      object: { userId: $recipient, friendId: $sender, original: false }
    ) {
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
    id
    _id: id
    text: body
    createdAt: date
    user: sender {
      id
      _id: id
      name
      avatar: image
    }
  }
`;

export const DETAILED_CHAT = gql`
  fragment DetailedChat on chat {
    id
    _id: id
    name
    image
    participants {
      id
      _id: id
      name
      image
    }
    messagesAggregate: messages_aggregate {
      aggregate {
        count
      }
    }
    messages(limit: 15, order_by: { date: desc }) {
      ...DetailedMessage
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export const GET_CHATS = gql`
  subscription getChats($user: String!) {
    chats(
      limit: 15
      order_by: { messages_aggregate: { max: { date: desc } } }
      where: {
        _and: [{ participants: { id: { _eq: $user } } }, { messages: {} }]
      }
    ) {
      ...DetailedChat
    }
  }
  ${DETAILED_CHAT}
`;

export const SEARCH_CHATS = gql`
    query searchChats($user: String!, $query: String!) {
        chats(
            limit: 15
            order_by: { messages_aggregate: { max: { date: desc } } }
            where: {
                _and: [{ participants: { id: { _eq: $user } } }, { name: { _ilike: $query} }]
            }
        ) {
            ...DetailedChat
        }
    }
    ${DETAILED_CHAT}
`

export const GET_CHAT_BY_ID = gql`
  query getChatById($id: Int!) {
    chat(id: $id) {
      ...DetailedChat
    }
  }
  ${DETAILED_CHAT}
`;

export const NEW_CHAT = gql`
  mutation newChat(
    $participants: userChat_arr_rel_insert_input!
    $image: String!
  ) {
    createChat(object: { users: $participants, image: $image }) {
      ...DetailedChat
    }
  }
  ${DETAILED_CHAT}
`;

export const DELETE_CHAT = gql`
  mutation deleteChat($id: Int!) {
    deleteChat(id: $id) {
      id
    }
  }
`;

export const GET_NEW_MESSAGES = gql`
  subscription getMessages($chatId: Int!) {
    messages(
      where: { _and: [{ chatId: { _eq: $chatId } }] }
      limit: 1
      order_by: { date: desc }
    ) {
      ...DetailedMessage
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export const GET_EARLIER_MESSAGES = gql`
  query getEarlierMessages($chatId: Int!, $offset: Int!, $limit: Int!) {
    messages(
      where: { chatId: { _eq: $chatId } }
      offset: $offset
      limit: $limit
      order_by: { date: desc }
    ) {
      ...DetailedMessage
    }
  }
  ${MESSAGE_FRAGMENT}
`;

export const SEND_MESSAGE = gql`
  mutation sendMessage($chatId: Int!, $senderId: String!, $body: String!) {
    sendMessage(object: { chatId: $chatId, senderId: $senderId, body: $body }) {
      id
    }
  }
`;

export const DETAILED_EVENT_FRAGMENT = gql`
  fragment DetailedEvent on event {
    description
    id
    image
    location
    name
    startDate
    endDate
    isOfficial
    website
    attendees(where: { didAccept: { _eq: true } }) {
      user {
        image
        id
        name
      }
      didAccept
    }
    attendees_aggregate {
      aggregate {
        count
      }
    }
    invited: attendees(where: { didAccept: { _eq: false } }) {
      user {
        image
        id
        name
      }
      didAccept
    }
    invited_aggregate: attendees_aggregate(
      where: { didAccept: { _eq: false } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_DETAILED_EVENT = gql`
  query getDetailedEvent($id: uuid!) {
    event(id: $id) {
      ...DetailedEvent
    }
  }
  ${DETAILED_EVENT_FRAGMENT}
`;

export const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    events {
      id
      image
      name
      startDate
      endDate
      attendees(limit: 3) {
        user {
          id
          image
        }
      }
      attendees_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const UPDATE_CALENDARS = gql`
  mutation updateCalendars(
    $userId: String!
    $groupId: uuid!
    $onCalendar: Boolean!
  ) {
    updateUserGroup(
      pk_columns: { groupId: $groupId, userId: $userId }
      _set: { onCalendar: $onCalendar }
    ) {
      user {
        id
        member {
          groupId
          group {
            id
            name
            groupType
          }
          onCalendar
        }
      }
    }
  }
`;

export const GET_SCHEDULED_EVENTS = gql`
  query GetScheduledEvents($userId: String!) {
    user(id: $userId) {
      id
      member {
        groupId
        group {
          id
          name
          groupType
        }
        onCalendar
      }
    }
    events(
      order_by: { startDate: asc }
      where: {
        hosts: {
          group: {
            members: {
              _and: { onCalendar: { _eq: true }, userId: { _eq: $userId } }
            }
          }
        }
      }
    ) {
      id
      image
      name
      startDate
      description
      attendees(limit: 3) {
        user {
          id
          image
        }
      }
      attendees_aggregate {
        aggregate {
          count
        }
      }
      hosts {
        groupId
      }
    }
  }
`;

export const GET_EVENTS_BY_ID = gql`
  query GetEventsById($_in: [uuid!]!) {
    events(where: { id: { _in: $_in } }, order_by: { startDate: asc }) {
      id
      image
      name
      startDate
      description
      attendees(limit: 3) {
        user {
          id
          image
        }
      }
      attendees_aggregate {
        aggregate {
          count
        }
      }
      hosts {
        groupId
      }
    }
  }
`;

export const GET_EVENT = gql`
  query getEvent($id: uuid!) {
    event(id: $id) {
      id
      name
      image
      startDate
      hosts {
        groupId
      }
    }
  }
`;

export const GET_EVENT_IMAGE_NAME = gql`
  query getEvent($id: uuid!) {
    event(id: $id) {
      id
      name
      image
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation updateEvent($id: uuid!, $data: event_set_input!) {
    updateEvent(pk_columns: { id: $id }, _set: $data) {
      id
      image
      name
      location
      description
      startDate
      endDate
      website
    }
  }
`;

export const CHECK_USER_EVENT_ACCEPTED = gql`
  query CheckUserEventAccepted($eventId: uuid!, $userId: String!) {
    user(id: $userId) {
      id
      events(where: { event: { id: { _eq: $eventId } } }) {
        didAccept
        eventId
      }
    }
  }
`;

const EVENT_ATTENDANCE_FRAGMENT = gql`
  fragment EventAttendance on event {
    id
    attendees(where: { didAccept: { _eq: true } }) {
      user {
        image
        id
        name
      }
      didAccept
    }
    attendees_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const EVENT_INVITED_FRAGMENT = gql`
  fragment EventInvited on event {
    invited: attendees(where: { didAccept: { _eq: false } }) {
      user {
        image
        id
        name
      }
      didAccept
    }
    invited_aggregate: attendees_aggregate(
      where: { didAccept: { _eq: false } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_EVENT_ATTENDANCE = gql`
  query GetEventAttendance($eventId: uuid!) {
    event(id: $eventId) {
      ...EventAttendance
    }
  }
  ${EVENT_ATTENDANCE_FRAGMENT}
`;

export const GET_EVENT_INVITED = gql`
  query GetEventAttendance($eventId: uuid!) {
    event(id: $eventId) {
      id
      ...EventInvited
    }
  }
  ${EVENT_INVITED_FRAGMENT}
`;

export const GET_EVENT_IMAGE_CARD = gql`
  query getEventImageCard($id: uuid!) {
    event(id: $id) {
      id
      name
      image
      ...EventAttendance
    }
  }
  ${EVENT_ATTENDANCE_FRAGMENT}
`;

export const SIGN_UP_USER_FOR_EVENT = gql`
  mutation SignUpUserForEvent($eventId: uuid!, $userId: String!) {
    signUpUserForEvent(
      object: { didAccept: true, eventId: $eventId, userId: $userId }
    ) {
      userId
      eventId
      didAccept
      event {
        ...EventAttendance
      }
      user {
        id
        events(where: { event: { id: { _eq: $eventId } } }) {
          didAccept
          eventId
        }
      }
    }
  }
  ${EVENT_ATTENDANCE_FRAGMENT}
`;

export const INVITE_USER_TO_EVENT = gql`
  mutation inviteUserToEvent($eventId: uuid!, $userId: String!) {
    signUpUserForEvent(
      object: { didAccept: false, eventId: $eventId, userId: $userId }
    ) {
      userId
      eventId
      didAccept
      event {
        id
        invited: attendees(where: { didAccept: { _eq: false } }) {
          user {
            image
            id
            name
          }
          didAccept
        }
        invited_aggregate: attendees_aggregate(
          where: { didAccept: { _eq: false } }
        ) {
          aggregate {
            count
          }
        }
      }
    }
  }
`;

export const REMOVE_USER_FROM_EVENT = gql`
  mutation removeUserFromEvent($eventId: uuid!, $userId: String!) {
    removeUserFromEvent(eventId: $eventId, userId: $userId) {
      userId
      eventId
      didAccept
    }
  }
`;

export const CONFIRM_EVENT_INVITE = gql`
  mutation confirmEventInvite($eventId: uuid!, $userId: String!) {
    confirmEventInvite(
      pk_columns: { eventId: $eventId, userId: $userId }
      _set: { didAccept: true }
    ) {
      userId
      eventId
      didAccept
    }
  }
`;

export const GET_USER_GROUPS = gql`
  query getUserGroups($id: String!) {
    user(id: $id) {
      id
      member {
        isOwner
        group {
          id
          name
          image
        }
      }
    }
  }
`;

export const GET_GROUP = gql`
  query getGroup($id: uuid!) {
    group(id: $id) {
      id
      name
      image
      members_aggregate(where: { isOwner: { _eq: false } }) {
        aggregate {
          count
        }
      }
      members(limit: 3, where: { isOwner: { _eq: false } }) {
        user {
          id
          image
        }
      }
    }
  }
`;

export const GET_GROUP_IMAGE_NAME = gql`
  query getGroupImageName($id: uuid!) {
    group(id: $id) {
      id
      name
      image
    }
  }
`;

export const GET_ALL_GROUPS = gql`
  query getAllGroups {
    groups {
      id
      name
      image
    }
  }
`;

export const GET_ALL_GROUP_IDS = gql`
  query getAllGroupIds {
    groups {
      id
    }
  }
`;

export const GET_ORIENTATION_GROUPS = gql`
  query getAllGroups {
    groups(where: { unsubscribable: { _eq: true } }) {
      id
      name
      image
    }
  }
`;

export const GET_DETAILED_GROUP = gql`
  query getDetailedGroup($id: uuid!) {
    group(id: $id) {
      id
      name
      image
      description
      members(where: { isOwner: { _eq: false } }) {
        user {
          id
          image
          name
        }
      }
      owners: members(where: { isOwner: { _eq: true } }) {
        user {
          id
          image
          name
        }
      }
      trophies {
        id
        name
        score
      }
      trophies_aggregate {
        aggregate {
          sum {
            score
          }
        }
      }
      events {
        event {
          id
        }
      }
    }
  }
`;

export const UPDATE_GROUP = gql`
  mutation updateGroup($id: uuid!, $data: group_set_input!) {
    updateGroup(pk_columns: { id: $id }, _set: $data) {
      id
      description
      name
      image
    }
  }
`;

export const GET_GROUP_EVENTS = gql`
  query getGroupEvents($id: uuid!) {
    group(id: $id) {
      id
      events {
        event {
          id
        }
      }
    }
  }
`;

export const CREATE_GROUP = gql`
  mutation createGroup($object: group_insert_input!) {
    createGroup(object: $object) {
      id
      image
      name
      members_aggregate {
        aggregate {
          count
        }
      }
      members(limit: 3, where: { isOwner: { _eq: false } }) {
        user {
          id
          image
        }
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent($data: event_insert_input!) {
    createEvent(object: $data) {
      id
      name
      image
      description
      startDate
    }
  }
`;
/**
 * Make sure that $query is formatted like: %wordToSearch%
 */
export const SEARCH_ALL = gql`
  query searchAll($query: String!, $limit: Int!) {
    users(where: { name: { _ilike: $query } }, limit: $limit) {
      id
      image
      name
    }
    groups(where: { name: { _ilike: $query } }, limit: $limit) {
      id
      name
      image
      members_aggregate(where: { isOwner: { _eq: false } }) {
        aggregate {
          count
        }
      }
      members(limit: 3, where: { isOwner: { _eq: false } }) {
        user {
          id
          image
        }
      }
    }
    events(where: { name: { _ilike: $query } }, limit: $limit) {
      id
      name
      image
      ...EventAttendance
    }
  }
  ${EVENT_ATTENDANCE_FRAGMENT}
`;

export const SEARCH_USERS = gql`
  query searchUsers($query: String!, $limit: Int = 25) {
    users(where: { name: { _ilike: $query } }, limit: $limit) {
      id
      image
      name
    }
  }
`;

export const AWARD_TROPHIES = gql`
  mutation awardTrophies($objects: [groupTrophy_insert_input!]!) {
    awardTrophies(objects: $objects) {
      affected_rows
    }
  }
`;

export const BAN_USER = gql`
  mutation banUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

/**
 * NULL is a useless query used for when we use the useQuery hook conditionally and need to pass in some sort of gql object
 * @type {DocumentNode}
 * Todo Come up with a better solution this is hideous
 */
export const NULL = gql`
  {
    user(id: "0") {
      id
    }
  }
`;
