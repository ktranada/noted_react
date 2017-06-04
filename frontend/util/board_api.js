
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
