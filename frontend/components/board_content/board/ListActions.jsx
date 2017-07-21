import React from 'react';

import PropTypes from 'prop-types';

const propTypes = {
  destroyList: PropTypes.func.isRequired,
  toggleListDropdown: PropTypes.func.isRequired
}

const ListActions = props => (
  <div
    className="list__actions"
    tabIndex={-1}
    onBlur={props.toggleListDropdown}
    ref={props.listActionsRef}
  >
    <div className="list-actions__header">
      List Actions
      <i onClick={props.toggleListDropdown} className="material-icons">&#xE14C;</i>
    </div>

    <hr />
    <div onClick={props.toggleListDropdown} className="list-actions__actions">
      <div role="button" onClick={props.destroyList}>Remove List</div>
    </div>

  </div>
)

export default ListActions;
