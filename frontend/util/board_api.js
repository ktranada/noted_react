export const requestBoardMembers = boardId => (
  $.ajax({
    method: "GET",
    url: `/api/boards/${boardId}/users`
  })
);

export const requestConversations = (boardId) => (
  $.ajax({
    method: "GET",
    url: `/api/boards/${boardId}/conversations`
  })
);


export const createBoard = data => (
  $.ajax({
    method: 'POST',
    url: '/api/boards',
    data
  })
)
