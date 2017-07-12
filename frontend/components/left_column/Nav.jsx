import React from 'react';
import PropTypes from 'prop-types';

import { ADD_BOARD } from '../../actions/modal_actions';
import NavTab  from './NavTab';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.setMessageNotification = this.setMessageNotification.bind(this);
  }

  componentWillMount() {
    if (!this.props.isLanding) {
      this.requestBoard(this.props.currentBoardId, this.props);
    }
    this.props.requestSubscriptions();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBoardId !== this.props.currentBoardId) {
      this.requestBoard(nextProps.currentBoardId, nextProps);
    }
  }

  requestBoard(boardId, { boardIsLoaded, boardIsLoading }) {
    if (!boardIsLoaded && !boardIsLoading) {
      this.props.requestBoard(boardId);
    }
  }
  setMessageNotification(board_id, channel_id, isLoaded) {
    return () => {
      if (!window.location.hash.includes(`/messages/${channel_id}`)) {
        this.props.incrementMessageNotifications({ isLoaded,  board_id, channel_id, unread_messages: 1 });
      }
    }
  }


  render() {
    let { boards, currentBoardId } = this.props;
    const boardsList = boards.map((board) => (
      <NavTab
        key={board.id}
        {...board }
        setMessageNotification={this.setMessageNotification}
      />
    ));

    let boardFormButton = null;
    if (boardsList.length < 3) {
      boardFormButton = (
        <li className="navbar__button">
          <div role="button" onClick={this.props.toggleModal(ADD_BOARD)}>
            <i className="material-icons">&#xE145;</i>
          </div>
        </li>
      )
    }

    return (
      <ul className="navbar">
        {boardsList}
        {boardFormButton}
      </ul>
    );
  }
}

Nav.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequred,
    hasUnreadMessages: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  boardIsLoaded: PropTypes.bool.isRequired,
  boardIsLoading: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  requestBoard: PropTypes.func.isRequired,
  isLanding: PropTypes.bool.isRequired
}

export default Nav;
