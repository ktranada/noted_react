const create = (resource, board_id, data) => (
  $.ajax({
    method: 'POST',
    url: `/api/boards/${board_id}/${resource}s`,
    data: {
      [resource]: data,
    }
  })
)

const update = (resource, board_id, id, data) => (
  $.ajax({
    method: 'PUT',
    url: `/api/boards/${board_id}/${resource}s/${id}`,
    data: {
      [resource]: data,
    }
  })
)

const destroy = (resource, board_id, id) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/boards/${board_id}/${resource}s/${id}`
  })
)

export const requestBoard = boardId => (
  $.ajax({
    method: 'GET',
    url: `/api/boards/${boardId}`
  })
)

export const requestLists = board_id => (
  $.ajax({
    method: 'GET',
    url: `/api/boards/${board_id}/lists`,

  })
)

export const requestSubscriptions = () => (
  $.ajax({
    method: 'GET',
    url: `/api/subscriptions`
  })
);

export const requestMessages = (board_id, channelId, page) => (
  $.ajax({
    method: 'GET',
    url: `/api/boards/${board_id}/channels/${channelId}/messages`,
    data: {
      page,
    }
  })
);

export const createBoard = (data) => (
  $.ajax({
    method: 'POST',
    url: '/api/boards',
    data: {
      board: data
    }
  })
)

export const createInvites = (board_id, data) => (
  $.ajax({
    method: 'POST',
    url: `/api/boards/${board_id}/invites`,
    data: {
      invites: data
    }
  })
)

export const createComment = (board_id, data) => (
  create('comment', board_id,  data)
)

export const createList = (board_id, data) => (
  create('list', board_id,  data)
)

export const createCard = (board_id, data) => (
  create('card', board_id,  data)
)

export const createInvite = (board_id, data) => (
  create('invite', board_id,  data)
)

export const createMessage = (board_id, data) => (
  create('message', board_id,  data)
)


export const updateBoard = (board_id, data) => (
  update('board', board_id, data.id, data)
)

export const updateList = (board_id, data) => (
  update('list', board_id,  data.id, data)
)

export const updateCard = (board_id, data) => (
  update('card', board_id,  data.id, data)
)

export const updateMembership = (board_id, data) => (
  update('board_membership', board_id, data.id, data)
)

export const destroyBoard = (id) => (
  $.ajax({
    method: 'DELETE',
    url: `/api/boards/${id}`
  })
)

export const destroyInvite = (board_id, id) => (
  destroy('invite', board_id, id)
)

export const destroyCard = (board_id, id) => (
  destroy('card', board_id, id)
)

export const destroyMembership = (board_id, data) => (
  destroy('board_membership', board_id, data)
)
