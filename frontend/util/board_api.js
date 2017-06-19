export const requestBoard = boardId => (
  $.ajax({
    method: 'GET',
    url: `/api/boards/${boardId}`
  })
)

// export const requestBoardMembers = boardId => (
//   $.ajax({
//     method: 'GET',
//     url: `/api/boards/${boardId}/users`
//   })
// );

export const requestChannels = (boardId) => (
  $.ajax({
    method: 'GET',
    url: `/api/boards/${boardId}/channels`
  })
);

const create = (resource, data) => (
  $.ajax({
    method: 'POST',
    url: `/api/${resource}s`,
    data: {
      [resource]: data
    }
  })
)

const edit = (resource, id, data) => (
  $.ajax({
    method: 'PUT',
    url: `/api/${resource}s/${id}`,
    data: {
      [resource]: data
    }
  })
)

const destroy = (resource, id) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/${resource}s/${id}`
  })
)

export const createBoard = data => (
  create('board', data)
)

export const createComment = data => (
  create('comment', data)
)

export const createList = data => (
  create('list', data)
)

export const createCard = data => (
  create('card', data)
)

export const editCard = data => (
  edit('card', data.id, data)
)

export const deleteCard = id => (
  destroy('card', id)
)

export const createInvites = data => (
  create('invite', data)
)

export const createInvite = data => (
  create('invite', data)
)
