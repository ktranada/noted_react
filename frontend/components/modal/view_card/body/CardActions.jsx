import React from 'react';
import PropTypes from 'prop-types';

class CardActions extends React.Component {
  constructor(props) {
    super(props);

    this.deleteCard = this.deleteCard.bind(this);
  }

  deleteCard() {
    this.props.deleteCard();
    const { params } = this.props.match;
    this.props.history.push(`/boards/${params.boardId}/lists`);
  }

  render() {
    return (
      <div className="card-actions">
        <div className="actions__header">
          <i className="material-icons">&#xE06C;</i>
          <h4>Actions</h4>
        </div>
        <button
          className="button button-red"
          onClick={this.deleteCard}>
          <i className="material-icons">&#xE872;</i>
          Delete
        </button>
      </div>
    )
  }
}


CardActions.propTypes = {
  deleteCard: PropTypes.func.isRequired
}

export default CardActions;
