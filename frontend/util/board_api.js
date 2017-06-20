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

const update = (resource, id, data) => (
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
  update('card', data.id, data)
)

export const deleteCard = id => (
  destroy('card', id)
)

export const createInvites = data => (
  $.ajax({
    method: 'POST',
    url: '/api/invites',
    data: {
      'invites': data
    }
  })
)

export const createInvite = data => (
  create('invite', data)
)

export const destroyInvite = data => (
  destroy('invite', data)
)
