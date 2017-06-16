import React from 'react';
import PropTypes from 'prop-types';

class BoardContentDefault extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.props.toggleAddBoardModal();
  }

  render() {
    if (this.props.boardCount === 3) {
      return null
    }

    return(
      <div className="board-content-default">
        <div className="board-content-default__action">
          <p>Ready to start improving your workflow? Add a board and start organizing your tasks and thoughts.</p>

          <button
            type="button"
            className="button button-green"
            onClick={this.toggleModal}>Add Board</button>
        </div>
      </div>
    )
  }
}

export default BoardContentDefault;
