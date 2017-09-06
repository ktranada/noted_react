
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
