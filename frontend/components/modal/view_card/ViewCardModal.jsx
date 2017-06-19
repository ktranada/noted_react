import React from 'react';
import ModalOverlayContainer from '../ModalOverlayContainer';
import Header from './header/Header';
import Body from './body/Body';
import { getObjectById } from '../../../reducers/selectors';

class ViewCardModal extends React.Component {
  constructor(props) {
    super(props);

    this.editCard = this.editCard.bind(this);
    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);

  }

  componentWillReceiveProps(nextProps) {
      if (typeof nextProps.card === 'undefined') {
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
    if (this.props.isLoading) return null;

    const { card } = this.props;
    return(
      <ModalOverlayContainer
        onBackgroundClick={this.handleBackgroundClick}>
        <div className="view-card__modal-wrapper">
          <div className="view-card__modal">
            <Header card={card} editCard={this.editCard} />
            <Body boardId={this.props.boardId} card={card} />
          </div>
        </div>
      </ModalOverlayContainer>
    )
  }
}


export default ViewCardModal;
