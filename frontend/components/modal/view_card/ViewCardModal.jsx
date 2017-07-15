import React from 'react';
import merge from 'lodash/merge';

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
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && (typeof nextProps.card === 'undefined')) {
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
    this.props.createComment(comment);
  }

  editCard(data) {
    data['updated_by'] = this.props.currentUserId;
    data['board_id'] = this.props.boardId;
    const card = merge({}, this.props.card, data);
    this.props.editCard(card);
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
            isLoading ?
              <Spinner /> :
              (
                <div>
                  <Header card={card} editCard={this.editCard} />
                  <Body
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
