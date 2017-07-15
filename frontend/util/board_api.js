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

export const requestBoard = boardId => (
  $.ajax({
    method: 'GET',
    url: `/api/boards/${boardId}`
  })
)

export const requestLists = board_id => (
  $.ajax({
    method: 'GET',
    url: '/api/lists',
    data: {
      board_id
    }
  })
)

export const requestSubscriptions = () => (
  $.ajax({
    method: 'GET',
    url: `/api/subscriptions`
  })
);

export const requestMessages = (channelId, page) => (
  $.ajax({
    method: 'GET',
    url: `/api/channels/${channelId}/messages`,
    data: {
      page
    }
  })
);



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

export const createMessage = data => (
  create('message', data)
)

export const updateCard = data => (
  update('card', data.id, data)
)

export const updateList = data => (
  update('list', data.id, data)
)

export const updateLists = (board_id, lists, type="attributes") => (
  $.ajax({
    method: 'PUT',
    url: '/api/lists',
    data: {
      lists,
      board_id,
      type,
    }
  })
)


export const updateBoard = data => (
  update('board', data.id, data)
)

export const updateMembership = data => (
  update('board_membership', data.id, data)
)

export const destroyBoard = data => (
  destroy('board', data)
)

export const destroyInvite = data => (
  destroy('invite', data)
)

export const destroyCard = id => (
  destroy('card', id)
)

export const destroyMembership = data => (
  destroy('board_membership', data)
)
