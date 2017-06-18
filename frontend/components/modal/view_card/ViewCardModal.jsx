import React from 'react';
import ModalWrapperContainer from '../ModalWrapperContainer';
import Header from './header/Header';
import Body from './body/Body';

class ViewCardModal extends React.Component {
  constructor(props) {
    super(props);

    this.createComment = this.createComment.bind(this);
    this.editCard = this.editCard.bind(this);
    this.handleBackgroundClick = this.handleBackgroundClick.bind(this);
  }

  createComment(data) {

  }

  editCard(data) {
    data['id'] = this.props.card.id;
    this.props.editCard(data);
  }

  handleBackgroundClick() {
    const { params } = this.props.match;
    this.props.history.push(`/boards/${params.boardId}/lists`);
  }

  render() {
    if (this.props.isLoading) return null;

    const { card } = this.props;
    return(
      <ModalWrapperContainer
        onBackgroundClick={this.handleBackgroundClick}>
        <div className="view-card__modal">
          <Header card={card} editCard={this.editCard} />
          <Body card={card} />
        </div>
      </ModalWrapperContainer>
    )
  }
}


export default ViewCardModal;
