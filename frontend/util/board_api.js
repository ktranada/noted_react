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

export const requestMessages = (board_id, channelId, latest) => (
  $.ajax({
    method: 'GET',
    url: `/api/boards/${board_id}/channels/${channelId}/messages`,
    data: {
      latest,
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

export const createInvite = (board_id, data) => (
  create('invite', board_id,  data)
)

export const updateBoard = (board_id, data) => (
  $.ajax({
    method: 'PUT',
    url: `/api/boards/${board_id}`,
    data: {
      board: data,
    }
  })
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

export const destroyMembership = (board_id, data) => (
  destroy('board_membership', board_id, data)
)
