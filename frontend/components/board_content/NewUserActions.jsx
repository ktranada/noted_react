import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  boardCount: PropTypes.number.isRequired,
  toggleModal: PropTypes.func.isRequired
}

function NewUserActions(props) {
  if (props.boardCount === 3) {
    return null
  }

  return(
    <div className="new-user-actions">
      <div className="new-user-actions__action">
        <p>Ready to start improving your workflow? Add a board and start organizing your tasks and thoughts.</p>

        <button
          type="button"
          className="button button-green"
          onClick={props.toggleModal('ADD_BOARD')}>Add Board</button>
      </div>
    </div>
  )
}

NewUserActions.propTypes = propTypes;

export default NewUserActions;
