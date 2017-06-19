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

  const { prepend = false, remove = false } = options;
  const list = remove ? [...entity[association]].filter(id => id !== newObjectId) :
    prepend ?
      [newObjectId, ...entity[association]] :
      [...entity[association], newObjectId];

  let newState = byIdObject(associationId, {
    [association]: list
  });
  return remove ? updateObjectWithUpdatedAssociations(state, newState) : updateObject(state, newState);
}

export const deleteObjectById = (state, id) => {
  const entities = merge({}, state.byId);
  if (typeof entities === 'undefined') {
    return state;
  }
  delete entities[id];
  return ({
    byId: entities
  });
}
