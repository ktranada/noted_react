import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../util/Spinner';

const propTypes = {
  currentBoard: PropTypes.object.isRequired,
  hasInvites: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
}

class InitialBoardContent extends React.Component {
  componentWillMount() {
    if (!this.props.match.isExact){
      this.props.history.replace(`/boards/${this.props.currentBoard.id}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.match.isExact){
      this.props.history.replace(`/boards/${this.props.currentBoard.id}`);
    }
  }

  render() {
    const { currentBoard, hasInvites, toggleModal, isLoading } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    const canInviteMembers = currentBoard.owner && hasInvites;
    const nonAdminDisplayStyle = { height: 135 }
    return (
      <div className="new-user-actions board-content-nav">
        <div className="new-user-actions__action" style={canInviteMembers ? {} : nonAdminDisplayStyle}>
          <div className="new-user-actions__view-board">
            <p><b>View the board</b> to start creating lists and organizing thoughts.</p>
            <Link to={`/boards/${currentBoard.id}/lists`}>
              <button type="button" className="button button-bluegrey-light">
                <i aria-hidden className="material-icons">&#xE3EC;</i> View Board
              </button>
            </Link>
          </div>
          {canInviteMembers && <hr />}
          {
            canInviteMembers &&
            <div className="new-user-actions__view-board">
              <p><b>Invite people</b> to start creating lists and organizing thoughts.</p>
              <button
                type="button"
                className="button button-bluegrey-light"
                onClick={toggleModal('INVITE_PEOPLE')}>
                  <i aria-hidden className="material-icons">&#xE7FB;</i> Invite People
              </button>
            </div>
          }
        </div>
      </div>
    )
  }
}

InitialBoardContent.propTypes = propTypes;

export default InitialBoardContent;
