export const asArray = (obj) => (
  Object.keys(obj).map(key => obj[key])
)

export const getCurrentBoardById = (id, boards) => {
  return boards.byId[id];
}
