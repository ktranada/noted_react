import React from 'react';
import ModalOverlayContainer from '../ModalOverlayContainer';
import Header from './header/Header';
import Body from './body/Body';
import { getObjectById } from '../../../reducers/selectors';
import Spinner from '../../misc/spinner';

class ViewCardModal extends React.Component {
  constructor(props) {
    super(props);

    this.editCard = this.editCard.bind(this);
    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading && (typeof nextProps.card === 'undefined')) {
      this.props.history.replace(`/boards/${this.props.boardId}/lists`)
    }
  }

  editCard(data) {
    data['id'] = this.props.card.id;
    this.props.editCard(data);
  }

  handleBackgroundClick() {
    this.props.history.push(`/boards/${this.props.boardId}/lists`);
  }

  render() {
    const { card, isLoading, currentBoard } = this.props;
    return(
      <ModalOverlayContainer
        onBackgroundClick={this.handleBackgroundClick}
        modalType="view-card">
        <div className="view-card-modal__content">
          {
            isLoading ?
            <Spinner /> :
              (
                <div>
                  <Header card={card} editCard={this.editCard} />
                  <Body
                    currentBoard={currentBoard}
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
