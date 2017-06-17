export const requestBoard = boardId => (
  $.ajax({
    method: 'GET',
    url: `/api/boards/${boardId}`
  })
)

export const requestBoardMembers = boardId => (
  $.ajax({
    method: 'GET',
    url: `/api/boards/${boardId}/users`
  })
);

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


export const createBoard = data => (
  create('board', data)
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
