import merge from 'lodash/merge';

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


export const updateAssociationList = (state, associationId, association, newObjectId) => {
  let entity = state.byId[associationId];
  if (typeof entity === 'undefined') {
    return state;
  }

  let newState = byIdObject(associationId, {
    [association]: [...entity[association], newObjectId]
  });

  return updateObject(state, newState);
}
