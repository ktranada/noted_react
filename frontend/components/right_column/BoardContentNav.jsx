import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class BoardContentNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggleInviteModal = this.toggleInviteModal.bind(this);
  }

  toggleInviteModal() {
    this.props.toggleInviteModal();
  }

  render() {
    const { match } = this.props;
    window.props = this.props;
    return (
      <div className="board-content-default board-content-nav">
        <div className="board-content-default__action">
          <div className="board-content-default__view-board">
            <p><b>View the board</b> to start creating lists and organizing thoughts.</p>
            <Link to={`/boards/${match.params.boardId}/lists`}>
              <button type="button" className="button button-bluegrey-light">
                <i aria-hidden className="material-icons">&#xE3EC;</i> View Board
              </button>
            </Link>
          </div>
          <hr />
          <div className="board-content-default__view-board">
            <p><b>Invite people</b> to start creating lists and organizing thoughts.</p>
            <button
              type="button"
              className="button button-bluegrey-light"
              onClick={this.toggleInviteModal}>
                <i aria-hidden className="material-icons">&#xE7FB;</i> Invite People
            </button>
          </div>
        </div>
      </div>

    )
  }
}

export default BoardContentNav;
