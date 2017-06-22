import React from 'react';
import PropTypes from 'prop-types';

class CardActions extends React.Component {
  constructor(props) {
    super(props);

    this.destroyCard = this.destroyCard.bind(this);
  }

  destroyCard() {
    this.props.destroyCard();
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
          onClick={this.destroyCard}>
          <i className="material-icons">&#xE872;</i>
          Delete
        </button>
      </div>
    )
  }
}


CardActions.propTypes = {
  destroyCard: PropTypes.func.isRequired
}

export default CardActions;
