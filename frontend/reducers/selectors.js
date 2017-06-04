export const asArray = (obj) => {
  Object.keys(obj).map(key => obj[key]);
}

export const getCurrentBoard = (id, boards) => {
  return boards.filter((board, idx) => board.id === id)[0];
}
