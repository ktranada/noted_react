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

class BoardActionCable extends React.Component {
  constructor(props) {
    super(props);

    this.handleReceived = this.handleReceived.bind(this);
    this.handleListNotification = this.handleListNotification.bind(this);
    this.handleCardNotification = this.handleCardNotification.bind(this);
    this.handleCommentNotification = this.handleCommentNotification.bind(this);

  }
  handleReceived(data) {
    const { type, action } = data;
    if (this.props.currentUserId !== Number.parseInt(data.updated_by)) {
      // Another user has made the changes
      switch (type) {
        case 'list': this.handleListNotification(action, data); break;
        case 'card': this.handleCardNotification(action, data); break;
        case 'comment': this.handleCommentNotification(action, data); break;
      }
    }
  }

  handleListNotification(action, data) {
    const { list } = data;
    const { moveList, addList } = this.props.listCallbacks;
    if (action === 'move') {
      const { id, position } = list;
      moveList(id, position);
    } else if (action === 'create') {
      addList(list);
    }
  }

  handleCardNotification(action, data) {
    const { card } = data;
    const { moveCard, addCard } = this.props.cardCallbacks;
    switch (action) {
      case 'move':
        const { id, list_id, position } = card;
        moveCard(id, list_id, position, data.previous_list_id);
        break;
      case 'create':
        addCard(card);
        break;
      case 'update':
        this.props.cardCallbacks.updateCard(card);
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
        ref="boardChannel"
        channel={{channel: 'BoardChannel', room: this.props.currentBoardId}}
        onReceived={this.handleReceived}
      />
    )
  }
}

export default BoardActionCable;
