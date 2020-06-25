## Frontend

### Prerequisits

Node, Watchman, React-Native CLI, Xcode

See https://reactnative.dev/docs/environment-setup

### Getting Started

```
npx react-native run-ios
```
or if using Android

```
npx react-native run-android
```

### Overview

The frontend is built using react native while the backend and [database](http://exploriti-backend.herokuapp.com/console/api-explorer) is on Hasura / HeroKu

GraphQL is the primary API, managed on the client side with [Apollo](https://www.apollographql.com/)


### Objectives

The primary objective is to create a pleasant and inuitive user experience. Other priorities include:

1. Consistant experience across time and between users

2. Minimize bugs and runtime errors

3. Small package size. Do not install a library unless it is necessary and if possible pick the smalles available option

4. Ensuring the app is compatible with most phones in use today 

### Code Quality 

all components and large functions should be annotated with JSDocs. For example: 

```
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```

Do not be afraid to use inline comments to further descrbe the more complex parts of your code.

We have taken the approach of using functional components and hooks in this project.

[Prettier](https://prettier.io/) is our code formatter of choice. Reference the `.prettierrc.js` file in home directory for details. In general please try to keep functions and components as short and simple as possible. 

### Tips and Tricks

* If you see a server error regarding your JWT token simply refresh the app 
* If someone adds a dependency to package.json make sure you run `npm install` and rebuild the app 

# Thank you for your help!


