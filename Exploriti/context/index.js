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

export function yearToInt(year: String) {
    switch (year) {
        case "First Year":
            return 1;
        case "Second Year":
            return 2;
        case "Third Year":
            return 3;
        case "Fourth Year":
            return 4;
        default:
            return 5;
    }
}

export const parseTimeElapsed = (utcTime: string) => {
    const timeNow = new Date().getTime();
    const actionTime = new Date(utcTime).getTime();

    let difference = timeNow - actionTime;

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

    const readableTime = parsedTime === 'just now' ? `${parsedTime}` : `${parsedTime} ago`;

    return {
        parsedTime,
        readableTime
    };
};


export const yearsData = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Graduate School'];
export const facultiesData = ['Arts', 'Science', 'Engineering'];
