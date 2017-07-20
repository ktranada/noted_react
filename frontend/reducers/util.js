import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';

export function updateObjectWithUpdatedAssociations(state, newState) {
  return mergeWith({}, state, newState, (obj, source) => {
    if (Array.isArray(obj)) {
      return source;
    }
  })
}

export function updateObject(state, newState) {
  return merge({}, state, newState)
}

export function byIdObject(id, newState) {
  return ({
    byId: {
      [id]: newState
    }
  });
}


export const updateAssociationList = (state, associationId, association, newObjectId, options = {}) => {
  let entity = state.byId[associationId];
  if (typeof entity === 'undefined') {
    return state;
  }

  const addition = newObjectId instanceof Array ? newObjectId : [newObjectId]
  const { prepend = false, remove = false } = options;
  const list = remove ? [...entity[association]].filter(id => id !== newObjectId) :
    prepend ?
      [...addition, ...entity[association]] :
      [...entity[association], ...addition];

  let newState = byIdObject(associationId, {
    [association]: list
  });
  return remove ? updateObjectWithUpdatedAssociations(state, newState) : updateObject(state, newState);
}

export const deleteObjectById = (state, id, type = 'byId') => {
  if (state[type] && state[type][id] === undefined) {
    return state;
  }

  const entities = merge({}, state[type]);

  delete entities[id];
  return ({
    [type]: entities
  });
}

export const removeObjectsByBoard = (state, objectIds) => {
  const newState = merge({}, state.byId);

  objectIds.forEach(id => {
    delete newState[id]
  });

  return ({ byId: newState })
}
