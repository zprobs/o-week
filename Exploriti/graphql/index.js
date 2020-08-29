import gql from 'graphql-tag';

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
    onlyFriendsCanMessage
    isLeader
    isAdmin
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
  query getDetailedUser($id: String!, $currentUser: String!) {
    user(id: $id) {
      ...DetailedUser
      blocker(
        where: {blockedId: {_eq: $currentUser}}
      ) {
        blockerId
      }
      userChats(
        where: {chat: {users: {userId: {_eq: $currentUser}}}}, 
        limit: 1, 
        order_by: {chat: {participants_aggregate: {count: asc}}}
      ) {
        chat {
            id
            participants_aggregate {
                aggregate {
                    count
                }
            }
        }
      }
    }
  }
  ${DETAILED_USER_FRAGMENT}
`;

export const NOTIFICATION_SUBSCRIPTION_FRAG = gql`
  fragment notificationSubcriptionFrag on user {
    notifications(order_by: { timestamp: desc }, limit: 60) {
      id
      timestamp
      type
      typeId
      seen
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  subscription getNotifications($id: String!) {
    user(id: $id) {
      id
      ...notificationSubcriptionFrag
    }
  }
  ${NOTIFICATION_SUBSCRIPTION_FRAG}
`;

export const NOTIFICATION_FRAG = gql`
  fragment notificationFrag on user {
    notifications(where: { seen: { _eq: false } }, limit: 400) {
      id
      seen
    }
  }
`;

export const GET_UNREAD_NOTIFICATIONS_COUNT = gql`
  subscription getUnreadNotificationsCountSub($id: String!) {
    user(id: $id) {
      id
      ...notificationFrag
    }
  }
  ${NOTIFICATION_FRAG}
`;

export const GET_UNREAD_NOTIFICATIONS_COUNT_QUERY = gql`
  query getUnreadNotificationsCountQuery($id: String!) {
    user(id: $id) {
      id
      ...notificationFrag
    }
  }
  ${NOTIFICATION_FRAG}
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

export const SEE_ALL_NOTIFICATIONS = gql`
  mutation seeAllNotifications($id: String!) {
    update_notification(
      where: { userNotifications: { userId: { _eq: $id } } }
      _set: { seen: true }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_NOTIFICATION = gql`
  mutation deleteNotification($notificationId: Int!, $userId: String!) {
    delete_userNotification_by_pk(
      notificationId: $notificationId
      userId: $userId
    ) {
      notificationId
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($id: String!) {
    user(id: $id) {
      ...DetailedUser
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
      isLeader
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

export const SEND_NOTIFICATIONS = gql`
  mutation sendNotifications(
    $recipients: [userNotification_insert_input!]!
    $type: String!
    $typeId: String!
  ) {
    sendNotification(
      object: {
        type: $type
        typeId: $typeId
        userNotifications: { data: $recipients }
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

export const GET_USERS_IN_CHAT = gql`
  query getUsersInChat($chatId: Int!, $offset: Int = 0) {
    chat(id: $chatId) {
      id
      users(limit: 20, offset: $offset) {
        user {
          id
          name
          image
        }
      }
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
  query getFriends($userId: String!, $offset: Int!) {
    user(id: $userId) {
      id
      friends(limit: 20, offset: $offset) {
        friend {
          id
          image
          name
          isLeader
          isAdmin
        }
      }
    }
  }
`;

export const GET_USER_FRIENDS_NOT_ATTENDING_EVENT = gql`
  query getFriendsNotAttendingEvent($userId: String!, $eventId: uuid!) {
    user(id: $userId) {
      id
      friends(
        where: { friend: { _not: { events: { eventId: { _eq: $eventId } } } } }
        limit: 150
      ) {
        friend {
          id
          image
          name
        }
      }
    }
  }
`;

export const GET_USER_FRIENDS_ID = gql`
  query getFriends($userId: String!) {
    user(id: $userId) {
      id
      friends {
        friend {
          id
        }
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
    user(id: $currentUser) {
      id
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
    
  }
`;

export const GET_CHAT = gql`
    query getChat($chatId: Int!, $userId: String!) {
        user(id: $userId) {
            id
            userChats(where: {_and: [{chatId: {_eq: $chatId}}, { chat: { messages: {} } }]}, limit: 1) {
                seen
                muted
                _id: chatId
                chat {
                    ...DetailedChat
                    messages(limit: 15, order_by: { date: desc }) {
                        ...DetailedMessage
                    }
                }
            }
        }
    }
    ${DETAILED_CHAT}
    ${MESSAGE_FRAGMENT}
`

export const GET_CHATS = gql`
  subscription getChats($user: String!) {
    user(id: $user) {
      id
      userChats(
        limit: 20
        order_by: { chat: { messages_aggregate: { max: { date: desc } } } }
        where: { chat: { messages: {} } }
      ) {
        seen
        muted
        _id: chatId
        chat {
          ...DetailedChat
            messages(limit: 1, order_by: { date: desc }) {
                ...DetailedMessage
            }
        }
      }
    }
  }
  ${DETAILED_CHAT}
  ${MESSAGE_FRAGMENT}
`;

export const GET_CHAT_MESSAGES = gql`
  query getChatMessages($chatId: Int!) {
      chat(id: $chatId){ 
          id
          messages(limit: 15, order_by: { date: desc }) {
              ...DetailedMessage
          }
          messagesAggregate: messages_aggregate {
              aggregate {
                  count
              }
          }
      }
  }
  ${MESSAGE_FRAGMENT}
`

export const GET_UNREAD_CHAT_COUNT = gql`
  subscription getUnreadChatCount($id: String!) {
    user(id: $id) {
      id
      userChats(
        where: { _and: [{ chat: { messages: {} } }, { seen: { _eq: false } }] }
      ) {
        chatId
        _id: chatId
        seen
      }
    }
  }
`;

export const SEARCH_CHATS = gql`
  query searchChats($user: String!, $query: String!) {
    user(id: $user) {
      id
      userChats(
        where: {
          chat: {
            _and: [
              {
                _or: [
                  { name: { _ilike: $query } }
                  {
                    participants: {
                      name: { _ilike: $query }
                      _and: { id: { _neq: $user } }
                    }
                  }
                ]
              }
              { messages: {} }
            ]
          }
        }
        limit: 25
      ) {
        chat {
          ...DetailedChat
        }
      }
    }
  }
  ${DETAILED_CHAT}
`;

export const SEARCH_USERS_ADD_TO_CHAT = gql`
  query searchUsersAddToChat($query: String!, $limit: Int = 25, $chatId: Int!) {
    users(
      where: {
        _and: [
          { name: { _ilike: $query } }
          { _not: { userChats: { chatId: { _eq: $chatId } } } }
        ]
      }
      limit: $limit
    ) {
      id
      image
      name
    }
  }
`;

export const NEW_CHAT = gql`
  mutation newChat(
    $participants: userChat_arr_rel_insert_input!
    $image: String!
    $name: String
  ) {
    createChat(object: { users: $participants, image: $image, name: $name }) {
      ...DetailedChat
    }
  }
  ${DETAILED_CHAT}
`;

export const ADD_USERS_TO_CHAT = gql`
  mutation insert_userChat($objects: [userChat_insert_input!]!) {
    insert_userChat(objects: $objects) {
      returning {
        chat {
          id
          participants {
            id
            name
          }
        }
      }
    }
  }
`;

export const UNSUBSCRIBE_FROM_CHAT = gql`
  mutation unsubscribeFromChat($chatId: Int!, $userId: String!) {
    unsubscribeFromChat(chatId: $chatId, userId: $userId) {
      chatId
      userId
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation deleteChat($chatId: Int!) {
    deleteChat(id: $chatId) {
      id
    }
  }
`;

export const UPDATE_CHAT = gql`
  mutation updateChat($id: Int!, $_set: chat_set_input!) {
    update_chat(where: { id: { _eq: $id } }, _set: $_set) {
      returning {
        id
        image
        name
      }
    }
  }
`;

export const GET_NEW_MESSAGES = gql`
  subscription getMessages($chatId: Int!, $max: Int!) {
    messages(
      where: { _and: [{ chatId: { _eq: $chatId } }, {id: { _gt: $max}}] }
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

export const UPDATE_MESSAGE_SEEN = gql`
  mutation MyMutation(
    $chatId: Int!
    $participants: [String!]!
    $seen: Boolean
  ) {
    update_userChat(
      where: { chatId: { _eq: $chatId }, userId: { _in: $participants } }
      _set: { seen: $seen }
    ) {
      returning {
        seen
      }
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
    eventType
    attendees(where: { didAccept: { _eq: true } }, limit: 20) {
      user {
        image
        id
        name
      }
    }
    attendees_aggregate {
      aggregate {
        count
      }
    }
    invited: attendees(where: { didAccept: { _eq: false } }, limit: 20) {
      user {
        image
        id
        name
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

export const GET_EVENT_EDIT = gql`
  query getEventEdit($id: uuid!) {
    event(id: $id) {
      description
      id
      image
      location
      name
      startDate
      endDate
      isOfficial
      website
      eventType
      attendees {
        user {
          id
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

const EVENT_ATTENDANCE_FRAGMENT = gql`
  fragment EventAttendance on event {
    id
    attendees(limit: 3) {
      user {
        image
        id
      }
    }
    attendees_aggregate {
      aggregate {
        count
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
      endDate
      location
      description
      ...EventAttendance
      hosts {
        groupId
      }
    }
  }
  ${EVENT_ATTENDANCE_FRAGMENT}
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
      eventType
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: uuid!) {
    deleteEvent(id: $id) {
      id
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

export const GET_EVENT_ATTENDANCE = gql`
  query GetEventAttendance(
    $eventId: uuid!
    $didAccept: Boolean!
    $offset: Int!
  ) {
    event(id: $eventId) {
      id
      attendees(
        where: { didAccept: { _eq: $didAccept } }
        limit: 20
        offset: $offset
      ) {
        user {
          id
          name
          image
        }
      }
    }
  }
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
    }
  }
`;

export const INVITE_USER_TO_EVENT = gql`
  mutation inviteUserToEvent($eventId: uuid!, $userId: String!) {
    signUpUserForEvent(
      object: { didAccept: false, eventId: $eventId, userId: $userId }
    ) {
      userId
    }
  }
`;

export const INVITE_USERS_TO_EVENT = gql`
  mutation inviteUsersToEvent($objects: [userEvent_insert_input!]!) {
    signUpUsersForEvent(objects: $objects) {
      affected_rows
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
      groupType
    }
  }
`;

//todo: don't do this, use backend for this
export const GET_ALL_GROUP_IDS = gql`
  query getAllGroupIds {
    groups {
      id
    }
    users {
      id
    }
  }
`;

export const GET_ORIENTATION_GROUPS = gql`
  query getOrientationGroups {
    groups(where: { groupType: { _eq: "orientation" } }) {
      id
      name
      image
    }
  }
`;

export const POST_FRAGMENT = gql`
  fragment postFragment on post {
    id
    groupId
    user {
      id
      name
      image
    }
    time
    comments_aggregate {
      aggregate {
        count
      }
    }
    text
    images
    link
  }
`;

export const GET_DETAILED_GROUP = gql`
  query getDetailedGroup($id: uuid!) {
    group(id: $id) {
      id
      name
      image
      description
      members(where: { isOwner: { _eq: false } }, limit: 20) {
        user {
          id
          image
          name
        }
      }
      owners: members(where: { isOwner: { _eq: true } }, limit: 20) {
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
      events(limit: 50, order_by: { event: { startDate: desc } }) {
        event {
          id
        }
      }
      unsubscribable
      groupType
      phone
      groupChats {
        chat {
          ...DetailedChat
        }
      }
      posts(limit: 4, order_by: { time: desc }) {
        ...postFragment
      }
      posts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  ${DETAILED_CHAT}
  ${POST_FRAGMENT}
`;

export const GET_GROUP_POSTS = gql`
  query getGroupPosts($groupId: uuid!) {
    group(id: $groupId) {
      id
      posts(limit: 4, order_by: { time: desc }) {
        ...postFragment
      }
      posts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_GROUP_POSTS_PAGINATED = gql`
  query getGroupPosts($groupId: uuid!, $offset: Int!) {
    group(id: $groupId) {
      id
      posts(limit: 8, order_by: { time: desc }, offset: $offset) {
        ...postFragment
      }
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_GROUP_MEMBERS = gql`
  query getGroupMembers($groupId: uuid!) {
    group(id: $groupId) {
      id
      members {
        userId
      }
    }
  }
`;

export const GET_GROUPS_MEMBERS = gql`
  query getGroupsMembers($groupIds: [uuid!]!) {
    groups(where: { id: { _in: $groupIds } }) {
      id
      members {
        userId
      }
    }
  }
`;

export const GET_GROUP_MEMBERS_PAGINATED = gql`
  query getGroupMembersPaginated(
    $groupId: uuid!
    $offset: Int!
    $isOwner: Boolean!
  ) {
    group(id: $groupId) {
      id
      members(
        where: { isOwner: { _eq: $isOwner } }
        limit: 20
        offset: $offset
      ) {
        user {
          id
          name
          image
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

export const INSERT_USER_GROUPS = gql`
  mutation insertUserGroups($objects: [userGroup_insert_input!]!) {
    insert_userGroup(objects: $objects) {
      affected_rows
    }
  }
`;

export const DELETE_USER_GROUPS = gql`
  mutation deletetUserGroups($groupId: uuid!, $_in: [String!]!) {
    delete_userGroup(
      where: { userId: { _in: $_in }, groupId: { _eq: $groupId } }
    ) {
      affected_rows
    }
  }
`;

export const GET_GROUP_EVENTS = gql`
  query getGroupEvents($id: uuid!) {
    group(id: $id) {
      id
      events(limit: 50, order_by: { event: { startDate: desc } }) {
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
      members {
        user {
          id
        }
      }
    }
  }
`;

export const INSERT_GROUP_CHAT = gql`
  mutation InsertGroupChat($chatId: Int!, $groupId: uuid!) {
    insert_groupChats_one(object: { chatId: $chatId, groupId: $groupId }) {
      group {
        id
        groupChats {
          chat {
            ...DetailedChat
          }
        }
      }
    }
  }
  ${DETAILED_CHAT}
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

export const SEARCH_USERS_IN_GROUP = gql`
  query searchUsers($query: String!, $limit: Int = 25, $groupId: uuid!) {
    users(
      where: {
        _and: [
          { name: { _ilike: $query } }
          { member: { groupId: { _eq: $groupId } } }
        ]
      }
      limit: $limit
    ) {
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

export const CHECK_USER_BLOCKED = gql`
  query checkUserBlocked($blockedId: String!, $blockerId: String!) {
    block(
      where: { blockedId: { _eq: $blockedId }, blockerId: { _eq: $blockerId } }
    ) {
      blockedId
      blockerId
    }
  }
`;

export const GET_USER_BLOCKS = gql`
  query getUserBlocks($id: String!) {
    user(id: $id) {
      id
      blocker {
        userByBlockedid {
          id
          name
        }
      }
    }
  }
`;

export const BLOCK_USER = gql`
  mutation blockUser($blockedId: String!, $blockerId: String!) {
    blockUser(object: { blockedId: $blockedId, blockerId: $blockerId }) {
      blockedId
      blockerId
    }
  }
`;

export const UNBLOCK_USER = gql`
  mutation unBlockUser($blockedId: String!, $blockerId: String!) {
    unblockUser(
      where: { blockedId: { _eq: $blockedId }, blockerId: { _eq: $blockerId } }
    ) {
      affected_rows
    }
  }
`;

export const REPORT_USER = gql`
  mutation ReportUser(
    $reporter: String!
    $reported: String!
    $postId: Int = null
    $commentId: Int = null
  ) {
    insert_report(
      objects: {
        reporter: $reporter
        reported: $reported
        post: $postId
        comment: $commentId
      }
    ) {
      affected_rows
    }
  }
`;

export const REPORT_CHAT = gql`
  mutation ReportChat($reporter: String!, $chat: Int!) {
    insert_report(objects: { reporter: $reporter, chat: $chat }) {
      affected_rows
    }
  }
`;

export const REPORT_BUG = gql`
  mutation reportBug($description: String!, $reporter: String!) {
    insert_bug(objects: { description: $description, reporter: $reporter }) {
      affected_rows
    }
  }
`;

export const SET_TOKEN = gql`
  mutation setToken($id: String!, $token: String!) {
    updateUser(pk_columns: { id: $id }, _set: { notificationToken: $token }) {
      id
    }
  }
`;

export const GET_LEADERBOARD = gql`
  query getLeaderBoard {
    groups(
      where: { groupType: { _eq: "orientation" } }
      order_by: { trophies_aggregate: { sum: { score: desc_nulls_last } } }
      limit: 25
    ) {
      id
      name
      trophies_aggregate {
        aggregate {
          sum {
            score
          }
        }
      }
    }
  }
`;

export const GET_RANDOM_USERS = gql`
  query getRandomUsers($userId: String!) {
    getrandomusers(args: { userid: $userId }) {
      id
      image
    }
  }
`;

export const MUTE_CHAT = gql`
  mutation MyMutation($chatId: Int!, $userId: String!, $muted: Boolean!) {
    update_userChat(
      where: { chatId: { _eq: $chatId }, userId: { _eq: $userId } }
      _set: { muted: $muted }
    ) {
      affected_rows
    }
  }
`;

export const GET_NOTIFICATION_SETTINGS = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      muteMessages
      muteEvents
      muteGroups
    }
  }
`;

export const GET_MESSAGE_SETTINGS = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      onlyFriendsCanMessage
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost(
    $userId: String!
    $groupId: uuid!
    $text: String!
    $images: jsonb
    $link: String
  ) {
    insert_post_one(
      object: {
        authorId: $userId
        groupId: $groupId
        text: $text
        images: $images
        link: $link
      }
    ) {
      id
    }
  }
`;

export const GET_DETAILED_POST = gql`
  query getDetailedPost($postId: Int!) {
    post(id: $postId) {
      ...postFragment
    }
  }
  ${POST_FRAGMENT}
`;

export const GET_POST_NOTIFICATION = gql`
  query getPostNotifications($id: Int!) {
    post(id: $id) {
      id
      user {
        id
        name
        image
      }
      group {
        id
        name
      }
    }
  }
  ${POST_FRAGMENT}
`;

export const ADD_COMMENT = gql`
  mutation insert_comment_one(
    $postId: Int!
    $text: String!
    $authorId: String!
  ) {
    insert_comment_one(
      object: { authorId: $authorId, postId: $postId, text: $text }
    ) {
      id
    }
  }
`;

export const GET_COMMENT_NOTIFICATION = gql`
  query getCommentNotification($id: Int!) {
    comment(id: $id) {
      id
      post {
        id
        group {
          id
          name
        }
      }
      user {
        id
        name
        image
      }
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getPostComments($postId: Int!, $offset: Int!) {
    post(id: $postId) {
      id
      comments(limit: 7, offset: $offset, order_by: { time: desc }) {
        id
        text
        time
        user {
          id
          image
          name
        }
      }
    }
  }
`;

export const CHECK_USER_LIKED = gql`
  query checkUserLiked($postId: Int!, $userId: String!) {
    like(userId: $userId, postId: $postId) {
      userId
    }
    post(id: $postId) {
      id
      likes_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

export const LIKE_POST = gql`
  mutation insert_like_one($postId: Int!, $userId: String!) {
    insert_like_one(object: { postId: $postId, userId: $userId }) {
      id
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation unLikePost($postId: Int!, $userId: String!) {
    delete_like_by_pk(postId: $postId, userId: $userId) {
      postId
    }
  }
`;

export const GET_LIKE_NOTIFICATION = gql`
  query getLikeNotification($id: Int!) {
    likes(where: { id: { _eq: $id } }, limit: 1) {
      id
      post {
        id
        group {
          id
          name
        }
      }
      user {
        id
        name
        image
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($id: Int!) {
    delete_post_by_pk(id: $id) {
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
