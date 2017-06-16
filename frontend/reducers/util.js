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
