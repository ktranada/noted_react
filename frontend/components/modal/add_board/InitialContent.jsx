import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleBoardSelection: PropTypes.func.isRequired
}

function InitialContent(props) {
  return (
    <div className="board-form-initial">
      <div className="board-form-initial__create">
        <p>Just getting started? Create a board and gather your thoughts.</p>
        <button
          type="button"
          onClick={props.handleBoardSelection('create')}
          className="button button-green">Create a Board</button>
      </div>
      <hr />
      <div className="board-form-initial__join">
        <p>Receive a board invite? Enter the code and start collaborating.</p>
        <button
          type="button"
          onClick={props.handleBoardSelection('join')}
          className="button button-bluegrey-light">Join a Board</button>
      </div>
    </div>
  )
}

InitialContent.propTypes = propTypes;

export default InitialContent;
