export const requestBoard = boardId => (
  $.ajax({
    method: "GET",
    url: `/api/boards/${boardId}`
  })
)

export const requestBoardMembers = boardId => (
  $.ajax({
    method: "GET",
    url: `/api/boards/${boardId}/users`
  })
);

export const requestChannels = (boardId) => (
  $.ajax({
    method: "GET",
    url: `/api/boards/${boardId}/channels`
  })
);


export const createBoard = data => (
  $.ajax({
    method: 'POST',
    url: '/api/boards',
    data
  })
)
