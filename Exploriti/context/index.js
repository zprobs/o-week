import React, { createContext, useEffect, useState } from 'react';
import storage from '@react-native-firebase/storage';
import { Keyboard } from 'react-native';
import firebase from '@react-native-firebase/app';
import { showMessage } from 'react-native-flash-message';

/**
 * The Context which contains the Firebase information about the current user. Contains object 'authState' which will have a value 'status' to
 * determine weather the user is 'loading', 'in' or 'out'. It also contains an object 'user' which has property of 'uid', the current user's ID.
 * @field authState
 * @field setAuthState
 * @type {React.Context<null>}
 */
export const AuthContext = createContext(null);
export const ReloadContext = createContext(null);

/**
 * A Method to prepare a list of interests or programs for the GraphQL server
 * @param list {[String]} array of IDs
 * @param idType {string} the type of data Ex: program
 * @returns {{data: {id: value}}}
 * @author Salman Shahid
 */
export const graphqlify = (list, idType) => {
  const id = idType + 'Id';
  let dict = {};
  dict['data'] = list.map((value) => {
    let empty = {};
    empty[id] = value;
    return empty;
  });
  return dict;
};

/**
 * Used to convert something like a list of users to invite to event into mutation ready object
 * @param constant {string} the eventId or term you want present in every element
 * @param list {[string]} the list of userId or the term which is unique in every element
 * @param constantTerm {string} name of the constant Ex: event
 * @param listTerm {string} name of the list type Ex: user
 * @returns {[]}
 */
export const graphqlify_relationship = (
  constant,
  list,
  constantTerm,
  listTerm,
) => {
  const data = [];
  for (const index in list) {
    const inner = {};
    inner[constantTerm + 'Id'] = constant;
    inner[listTerm + 'Id'] = list[index];
    data.push(inner);
  }
  return data;
};

/**
 * used to refresh JWT token with firebase
 * @param user
 * @param setAuthState
 * @returns {Promise<string | void>}
 */
export function refreshToken(user, setAuthState) {
  console.log('refresh Token starting function');
  try {
    return user
      .getIdToken(true)
      .then((token) =>
        firebase
          .auth()
          .currentUser.getIdTokenResult(true)
          .then((result) => {
            console.log(result);
            if (result.claims['https://hasura.io/jwt/claims']) {
              console.log('emailVerified', user);
              setAuthState({ status: 'in', user });
              return token;
            }
            const endpoint =
              'https://us-central1-exploriti-rotman.cloudfunctions.net/refreshToken';
            return fetch(`${endpoint}?uid=${user.uid}`).then((res) => {
              if (res.status === 200) {
                return user.getIdToken(true);
              }
              return res.json().then((e) => {
                throw e;
              });
            });
          }),
      )
      .catch((e) => console.log('caught', e))
      .then(() => {
        setAuthState({ status: 'in', user });
      })
      .catch(console.error);
  } catch (e) {
    console.log('failed to refresh');
    showMessage({
      message: 'Network error',
      description: e.message,
      autoHide: false,
      type: 'warning',
      icon: 'warning',
    });
  }
}

/**
 * function to parse the domain name from a string. Ex: (https://www.youtube.com/watch?123123) => youtube.com
 * @param url {string}
 * @returns {*}
 */
export const getHostnameFromRegex = (url) => {
  // run against regex
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
  // extract hostname (will be null if no match is found)
  return matches && matches[1];
};

export function yearToInt(year: String) {
  switch (year) {
    case 'First Year':
      return 1;
    case 'Second Year':
      return 2;
    case 'Third Year':
      return 3;
    case 'Fourth Year':
      return 4;
    case 'Year 5+':
      return 5;
    default:
      return 6;
  }
}
/**
 * function for processing graphQl query errors.
 * @param error The apollo error object
 * @param message {string}
 */
export function processWarning(error, message) {
  showMessage({
    message: message,
    description: error.message,
    autoHide: false,
    type: 'warning',
    icon: 'warning',
  });
}

/**
 * function for displaying an error message. Used for mutations
 * @param error
 * @param message {string}
 */
export function processError(error, message) {
  showMessage({
    message: message,
    description: error.message,
    autoHide: false,
    type: 'danger',
    icon: 'danger',
  });
}

/**
 * function to display time of the last message in conversation list
 * @param utcTime {string}
 * @returns {{readableTime: string, parsedTime: string}}
 */
export const parseTimeElapsed = (utcTime: string) => {
  const actionTime = new Date(utcTime).getTime();
  const timeNow = new Date().getTime();

  let difference = timeNow - actionTime;

  if (difference < 1000)
    return { readableTime: 'just now', parsedTime: 'just now' };

  const secondsInMs = 1000;
  const minutesInMs = secondsInMs * 60;
  const hoursInMs = minutesInMs * 60;
  const daysInMs = hoursInMs * 24;
  const weekInMs = daysInMs * 7;

  const elapsedWeeks = parseInt(difference / weekInMs, 10);
  difference = difference % weekInMs;

  const elapsedDays = parseInt(difference / daysInMs, 10);
  difference = difference % daysInMs;

  const elapsedHours = parseInt(difference / hoursInMs, 10);
  difference = difference % hoursInMs;

  const elapsedMinutes = parseInt(difference / minutesInMs, 10);
  difference = difference % minutesInMs;

  let parsedTime = '...';

  if (elapsedWeeks >= 1) {
    if (elapsedWeeks === 1) {
      parsedTime = `${elapsedWeeks} week`;
    } else {
      parsedTime = `${elapsedWeeks} weeks`;
    }
  } else if (elapsedDays >= 1) {
    if (elapsedDays === 1) {
      parsedTime = `${elapsedDays} day`;
    } else {
      parsedTime = `${elapsedDays} days`;
    }
  } else if (elapsedHours >= 1) {
    if (elapsedHours === 1) {
      parsedTime = `${elapsedHours} hr`;
    } else {
      parsedTime = `${elapsedHours} hrs`;
    }
  } else if (elapsedMinutes >= 1) {
    if (elapsedMinutes === 1) {
      parsedTime = `${elapsedMinutes} min`;
    } else {
      parsedTime = `${elapsedMinutes} mins`;
    }
  } else if (elapsedMinutes < 1) parsedTime = 'just now';

  const readableTime =
    parsedTime === 'just now' ? `${parsedTime}` : `${parsedTime} ago`;

  return {
    parsedTime,
    readableTime,
  };
};

const defaultImages = [
  'https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/default1.png?alt=media&token=5a9700a9-d2f4-4ff2-9e2e-b053c884f4fd',
  'https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/default2.png?alt=media&token=9560020e-ca06-47b6-a11c-e26787a3e90d',
  'https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/default3.png?alt=media&token=cfe35641-c453-4859-8dc1-1804554f4111',
  'https://firebasestorage.googleapis.com/v0/b/exploriti-rotman.appspot.com/o/default4.png?alt=media&token=91af31aa-2b62-4835-a631-7550dd2c05a2',
];

/**
 * Uploads the given image data to Google Firebase Storage and returns a promise
 * representing the URL of the uploaded image
 *
 * @param image: image data to upload
 * @param previous: url of previous image to delete (optional)
 * @param type {string} the type of image. Ex profile , event. Used for filename
 * @param id {id} the id of who owns image. Used for filename
 * @returns {Promise<R>}
 */
export const saveImage = (image, previous = null, type, id) => {
  console.log(image, previous);
  const { path } = image;
  const filename = `${type}/${id}`;
  console.log('filename', filename);
  const storageReference = storage().ref(filename);

  if (previous && !defaultImages.includes(previous)) {
    storage()
      .ref(storage().refFromURL(previous).fullPath)
      .delete()
      .then(() => {
        console.log('Successfully deleted image!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return new Promise((resolve, reject) => {
    storageReference
      .putFile(path)
      .then((uploadData) => {
        storageReference.getDownloadURL().then((imageURL) => {
          resolve(imageURL);
        });
      })
      .catch((err) => reject(err));
  });
};

export const getDefaultImage = () => {
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
};

/**
 * Hook for getting the keyboard Height
 * @returns {[number]}
 */
export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return [keyboardHeight];
};

export const NotificationTypes = {
  system: 'system',
  confirmFriendRequest: 'confirmFriendRequest',
  sendFriendRequest: 'sendFriendRequest',
  eventInvite: 'eventInvite',
  newEvent: 'newEvent',
  eventTimeChange: 'eventTimeChange',
  trophyAwarded: 'trophyAwarded',
  message: 'message',
  newPost: 'newPost',
  newComment: 'newComment',
  newLike: 'newLike',
};

/**
 * funtion used to decipher incoming notifications from firebase and configure the initial routes accordingly
 * @param type {string} one of NotificationTypes
 * @param typeId {string}
 */
export function notificationToRoute(type, typeId) {
  let tab, params;
  console.log('type typeID', type, typeId);
  if (
    type === NotificationTypes.sendFriendRequest ||
    type === NotificationTypes.confirmFriendRequest
  ) {
    tab = 'Orientation';
    params = {
      screen: 'Profile',
      params: {
        userId: typeId,
      },
      initial: false,
    };
  } else if (
    type === NotificationTypes.newEvent ||
    type === NotificationTypes.eventInvite ||
    type === NotificationTypes.eventTimeChange
  ) {
    tab = 'Orientation';
    params = {
      screen: 'EventScreen',
      params: {
        eventId: typeId,
      },
      initial: false,
    };
  } else if (type === NotificationTypes.message) {
    tab = 'Messages';
    params = null;
  } else if (
    type === NotificationTypes.newLike ||
    type === NotificationTypes.newComment ||
    type === NotificationTypes.newPost
  ) {
    tab = 'Orientation';
    params = {
      screen: 'PostScreen',
      params: {
        postId: typeId,
      },
      initial: false,
    };
  } else {
    tab = 'MyProfile';
    params = { screen: 'Notifications' };
  }

  return {
    tab,
    params,
  };
}

export const eventTypes = ['zoom', 'netflix', 'twitch'];

export const yearsData = [
  'First Year',
  'Second Year',
  'Third Year',
  'Fourth Year',
  'Year 5+',
  'Graduate School',
];
export const facultiesData = [
  'Bethune',
  'Calumet',
  'Founders',
  'Vanier',
  'Glendon',
  'McLaughlin',
  'Stong',
  'New College',
  'Winters',
];

export const rankData = [
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
  '10th',
  '11th',
  '12th',
  '13th',
  '14th',
  '15th',
  '16th',
  '17th',
  '18th',
  '19th',
  '20th',
];
