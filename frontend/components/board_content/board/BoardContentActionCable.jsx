import React from 'react';
import PropTypes from 'prop-types';

import { ActionCable } from '../../util/ActionCableProvider';

const propTypes = {
  currentUserId: PropTypes.number.isRequired,
  currentBoardId: PropTypes.number.isRequired,
  listCallbacks: PropTypes.shape({
    addList: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
  }).isRequired,
  cardCallbacks: PropTypes.shape({
    addCard: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
  }).isRequired,
  commentCallbacks: PropTypes.shape({
    addComment: PropTypes.func.isRequired,
  }).isRequired,
}

class BoardContentActionCable extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);
    this.handleListNotification = this.handleListNotification.bind(this);
    this.handleCardNotification = this.handleCardNotification.bind(this);
    this.handleCommentNotification = this.handleCommentNotification.bind(this);

  }
  handleReceived(data) {
    const { type, action } = data;
    if (action === 'move' && this.props.currentUserId !== Number.parseInt(data.updated_by)) {
      // Another user has made the changes
      if (type === 'list') {
        const { id, position } = data.list;
        this.props.listCallbacks.moveList(id, position);
      } else if (type === 'card') {
        const { id, list_id, position } = data.card;
        this.props.cardCallbacks.moveCard(id, list_id, position, data.previous_list_id);
      }
    } else {
      switch (type) {
        case 'list': this.handleListNotification(action, data); break;
        case 'card': this.handleCardNotification(action, data); break;
        case 'comment': this.handleCommentNotification(action, data); break;
      }
    }
  }

  handleListNotification(action, data) {
    const { list } = data;
    const { addList, updateList } = this.props.listCallbacks;
    switch (action) {
      case 'create': addList(list); break;
      case 'update': updateList(list); break;
    }
  }

  handleCardNotification(action, data) {
    const { card } = data;
    const { addCard, updateCard, removeCard } = this.props.cardCallbacks;
    switch (action) {
      case 'create': addCard(card);break;
      case 'update': updateCard(card); break;
      case 'destroy':
      if (window.location.hash.includes(`/boards/${this.props.currentBoardId}/card/${card.id}`)) {
        this.props.historyPush(`/boards/${this.props.currentBoardId}/lists`)
      }
      removeCard(card);
      break;
    }
  }

  handleCommentNotification(action, data) {
    const { comment } = data;
    const { addComment } = this.props.commentCallbacks;
    if (action === 'create') {
      addComment(comment);
    }
  }

  render() {
    return(
      <ActionCable
        ref={this.props.boardContentCableRef}
        channel={{channel: 'BoardContentChannel', room: this.props.currentBoardId, board_id: this.props.currentBoardId}}
        onReceived={this.handleReceived}
      />
    )
  }
}

export default BoardContentActionCable;
