import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class InitialBoardContent extends React.Component {
  constructor(props) {
    super(props);

    this.toggleInviteModal = this.toggleInviteModal.bind(this);
  }

  componentWillMount() {
    if (!this.props.match.isExact){
      this.props.history.replace(`/boards/${this.props.match.params.boardId}`);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.match.isExact){
      this.props.history.replace(`/boards/${this.props.match.params.boardId}`);
    }
  }



  toggleInviteModal() {
    this.props.toggleInviteModal();
  }

  render() {
    const { match } = this.props;
    window.props = this.props;
    return (
      <div className="new-user-actions board-content-nav">
        <div className="new-user-actions__action">
          <div className="new-user-actions__view-board">
            <p><b>View the board</b> to start creating lists and organizing thoughts.</p>
            <Link to={`/boards/${match.params.boardId}/lists`}>
              <button type="button" className="button button-bluegrey-light">
                <i aria-hidden className="material-icons">&#xE3EC;</i> View Board
              </button>
            </Link>
          </div>
          <hr />
          <div className="new-user-actions__view-board">
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

export default InitialBoardContent;
