import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  destroyCard: PropTypes.func.isRequired
}

const CardActions = props => (
  <div className="card-actions">
    <div className="actions__header">
      <i className="material-icons">&#xE06C;</i>
      <h4>Actions</h4>
    </div>
    <button
      className="button button-red"
      onClick={props.destroyCard}>
      <i className="material-icons">&#xE872;</i>
      Delete
    </button>
  </div>
)



CardActions.propTypes = propTypes

export default CardActions;
