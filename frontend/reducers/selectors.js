export const asArray = (obj) => (
  Object.keys(obj).map(key => obj[key])
)

export const asArrayByOrder = (state) => {
  const { byId, order } = state;
  return order.map(id => byId[id]);

}

export const getCurrentBoardById = (id, boards) => {
  return boards.byId[id];
}
