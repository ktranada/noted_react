import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';

import { ActionCable } from '../util/ActionCableProvider';
import { ADD_BOARD } from '../../actions/modal_actions';
import NavTab  from './NavTab';

const propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequred,
    subscribe_to_nav_notifications: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  isLanding: PropTypes.bool.isRequired,
  boardIsLoaded: PropTypes.bool.isRequired,
  boardIsLoading: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  requestBoard: PropTypes.func.isRequired,
  incrementMessageNotifications: PropTypes.func.isRequired,
}

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      boardNotifications: {}
    }

    this.onReceivedNotification = this.onReceivedNotification.bind(this);
    this.onReceivedBoardName = this.onReceivedBoardName.bind(this);
    this.updateNotificationList = this.updateNotificationList.bind(this);
  }

  componentDidMount() {
    this.updateNotificationList(this.props);
  }

  componentWillMount() {
    if (!this.props.isLanding) {
      this.requestBoard(this.props.currentBoardId, false, this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBoardId !== this.props.currentBoardId
        || this.props.timezone !== nextProps.timezone) {
      this.requestBoard(nextProps.currentBoardId, this.props.timezone !== nextProps.timezone, nextProps);
    }

    this.updateNotificationList(nextProps);
  }
  onReceivedBoardName(data) {
    this.props.updateBoard(data.board);
  }

  onReceivedNotification(data) {
    if (this.state.boardNotifications[data.board_id]) {
      const newState = merge({}, this.state);
      newState.boardNotifications[data.board_id].has_unread_messages = data.has_unread_messages;
      this.setState(newState);
      this.props.incrementMessageNotifications(data);
    }
  }

  requestBoard(boardId, isTimeZoneUpdate, { boardIsLoaded, boardIsLoading }) {
    if (!boardIsLoaded && !boardIsLoading) {
      this.props.requestBoard(boardId, isTimeZoneUpdate);
    }
  }

  updateNotificationList(props) {
    const boardNotifications = {}
    props.boards.forEach(board => {
      if (board.subscribe_to_nav_notifications) {
        const boardNotification = this.state.boardNotifications[board.id];
        boardNotifications[board.id] = { has_unread_messages:  boardNotification && boardNotification.has_unread_messages }
      }
    });
    this.setState({
      boardNotifications
    })
  }

  actionCableSubscriptions() {
    const subscriptions = []
    this.props.boards.forEach(board => {
        subscriptions.push(
          <ActionCable
            key={`navNotification${board.id}`}
            shouldUnsubscribe={!board.subscribe_to_nav_notifications || this.props.currentBoardId === board.id}
            channel={{channel: 'NavNotificationChannel', room: board.id, board_id: board.id}}
            onReceived={this.onReceivedNotification}
          />
        );
        subscriptions.push(
          <ActionCable
            key={`boardName${board.id}`}
            ref={`boardName${board.id}`}
            channel={{channel: 'BoardNameChannel', room: board.id, board_id: board.id}}
            onReceived={this.onReceivedBoardName}
          />
        )
      }
    )
    return subscriptions;
  }

  render() {
    let { boards, currentBoardId, isLanding } = this.props;
    const boardsList = boards.map((board) => (
      <NavTab
        key={board.id}
        hasNotifications={this.state.boardNotifications[board.id] && this.state.boardNotifications[board.id].has_unread_messages}
        {...board }
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
        {this.actionCableSubscriptions()}
        {boardsList}
        {boardFormButton}
      </ul>
    );
  }
}

Nav.propTypes = propTypes;

export default Nav;
