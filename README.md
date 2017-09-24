
# Overview

I use trello extensively to manage personal projects and to serve as a todo list. Noted is a Kanban board that also offers chat for team communication. Members belong to a board and will be able to see updates + messages in real time.

# Technical Tools

**Frontend**:

- ES6
- React
- Redux
- SCSS
- Webpack

**Backend**:
- Ruby
- Rails
- PostgreSQL
- Redis
- WebSockets
- Heroku

------

# System Architecture 

## Frontend

It consists of 5 sections:

1. Actions
2. Reducers
3. Stores (dev, prod)
4. Components
5. Util

**Actions**

The files are named in a way to represent what part of the app is reacting to user interaction. I.E. `board_actions.js` consists of actions that reflects a user's interaction with a board - adding a list, adding a card, etc.

Each file contains:

- Constants that state the type of action.
- Actions
  - Some actions communicate with the API, and so they are `thunks` - which is made acknowledged by the store through `applyMiddleware(thunk)`. 
  - Most actions will just be interactions with the store, and so they are POJOs.


**Reducers**

Unlike the general action creator files where they contain every action related to a part of the app, Reducer files are specific to what they maintain. 

I.E. `board_actions.js` contains all actions to board, lists, and cards. For the reducers, we have `boards_reducer.js`, `lists_reducer.js`, and `cards_reducer.js`

Each reducer file listens for a certain subset of actions and once matched, the reducer will update the state as necssary with the payload from the action POJO.

As it currently is, we're using `merge` from the Lodash library to create new state.

Each slice of state is normalized and so records reference records from another slice by their id. 

In general, most reducer state slices look as such:

```
byId: {
  1: {
    id: 1,
    ....
  }
},
order: [1]
```

**Stores**

Its configuration is dependent on environment. The only difference is that the `dev` store hooks into the Redux devtools for debugging.

Fairly straightforward. It takes a single reducer that is a combination of all reducers via `combineReducer` from Redux.

**Components**

This folder contains the building blocks of the UI. 

There are 2 top level views: 

If you're not in a board itself, you're at the `Landing` route. Otherwise, you're at the `Dashboard`.

In Noted, a user has to be signed in in order to view a board. Thus, we check for an existing session in the store and redirect if necessary.

I structured the folders and files in a way so that a folder acts as a `parent` in terms of DOM hierarchy, and that anything nested will be contained within that UI section.

I.E. `/components/board_content/board` contains the UI relevant to a board - lists and cards.
When a user views a card, this opens up a modal. Modals are an independent component because they **overlay** the current UI. So while a card does belong to a list, clicking a card create's a new context UI that contains information about the card and its content + comments. You can find the card modal components at `/components/modal/view_card`

-----

# Design

Before building a project, I would like to design it from front-to-back. This will give a clear idea of what components will be needed, how to organize them, and how they will function. The designs can be viewed [here](https://github.com/ktranada/noted_react/blob/master/docs/mocks/README.md).

------

# MVP

- A user can create boards and invite members to join and contribute.
  - A user can be a part of as many boards as they want, but can own only 3 at a time.
- A user can create lists - which are associated to a board.
- Users can add cards to lists
- Lists and cards are draggable.
- Each board has its own chat system
  - General chat
- Real-time features (using ActionCable to implement websockets)
  - Chat
  - Board Updates (updates, membership changes, etc)

  *admin = ability to delete

-------

# Extra features

- Private messages
- Assign card due dates, labels, or an assignee
