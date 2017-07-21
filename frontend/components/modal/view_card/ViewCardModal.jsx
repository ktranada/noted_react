import React from 'react';
import merge from 'lodash/merge';

import { ActionCable } from '../../util/ActionCableProvider';
import ModalOverlayContainer from '../ModalOverlayContainer';
import Header from './header/Header';
import Body from './body/Body';
import Spinner from '../../util/Spinner';
import { getObjectById } from '../../../reducers/selectors';

class ViewCardModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
    this.createComment = this.createComment.bind(this);
    this.editCard = this.editCard.bind(this);
    this.destroyCard = this.destroyCard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && (!nextProps.card)) {
      this.props.history.replace(`/boards/${this.props.boardId}/lists`)
    }
  }

  handleBackgroundClick() {
    this.props.history.push(`/boards/${this.props.boardId}/lists`);
  }
  createComment(comment) {
    comment['board_id'] = this.props.boardId
    comment['card_id'] = this.props.card.id;
    comment['updated_by'] = this.props.currentUserId;
    this.refs.boardChannel.perform('create_comment', comment);
  }

  editCard(data) {
    data['updated_by'] = this.props.currentUserId;
    data['board_id'] = this.props.boardId;
    const card = merge({}, this.props.card, data);
    this.refs.boardChannel.perform('edit_card', card);
  }

  destroyCard() {
    this.refs.boardChannel.perform('destroy_card', this.props.card);
  }

  render() {
    const { comments, members, card, isLoading, currentBoard } = this.props;
    return(
      <ModalOverlayContainer
        onBackgroundClick={this.handleBackgroundClick}
        modalType="view-card"
      >
        <div className="view-card-modal__content">
          {
            isLoading || !card ?
              <Spinner /> :
              (
                <div>
                  <ActionCable
                    ref="boardChannel"
                    channel={{channel: 'BoardContentChannel', room: currentBoard.id}}
                  />
                  <Header card={card} editCard={this.editCard} />
                  <Body
                    destroyCard={this.destroyCard}
                    createComment={this.createComment}
                    comments={comments}
                    members={members}
                    boardId={this.props.boardId}
                    card={card} />
                </div>
              )
          }
        </div>
      </ModalOverlayContainer>
    )
  }
}


export default ViewCardModal;
