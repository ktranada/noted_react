const isUndefined = obj => (
  typeof obj === 'undefined'
)

export const asArray = (obj) => (
  Object.keys(obj).map(key => obj[key])
)

export const mapOrderToObjects = (obj, order) => {
  if (isUndefined(order) || isUndefined(obj)) return [];
  return order.map(id => obj[id]);
}

export const asArrayByOrder = (entity, order) => {
  if (isUndefined(entity)) {
    return [];
  }

  const { byId } = entity;
  return mapOrderToObjects(byId, order);
}

export const getCurrentBoardById = (id, boards) => {
  if (isUndefined(boards) || boards.length === 0) {
    return null;
  }
  return boards.byId[id];
}

export const isLoadingByType = (loadingState, boardId, type) => {
    if (isUndefined(loadingState)) {
      return true;
    }
    let board = loadingState.byBoardId[boardId];
    return Boolean(board) ? board[type] : true;
}

export const getObjectById = (id, entity) => {
  if (isUndefined(entity) || isUndefined(id)) {
    return null;
  }

  return entity.byId[id];
}
