
# Overview

Noted is a kanban board for personal or team use.

------

# Design

[Can be viewed here](https://github.com/ktranada/noted_react/blob/master/docs/mocks/README.md)

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
