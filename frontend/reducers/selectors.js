export const asArray = (obj) => (
  Object.keys(obj).map(key => obj[key])
)

export const mapOrderToObjects = (obj, order) => {
  if (!order) return [];
  return order.map(id => obj[id]);
}

export const asArrayByOrder = (entity) => {
  const { byId, order } = entity;
  return mapOrderToObjects(byId, order);
}

export const asArrayByBoardOrder = (entity, order) => {
  const { byId } = entity;
  return mapOrderToObjects(byId, order);
}

export const getCurrentBoardById = (id, boards) => {
  return boards.byId[id];
}

export const isLoadingByType = (loadingState, boardId, type) => {
    if (typeof loadingState === 'undefined') return;
    let board = loadingState.byBoardId[boardId];
    return Boolean(board) ? board[type] : true;
}
