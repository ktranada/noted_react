import React from 'react';
import PropTypes from 'prop-types';
import CardEditableField from './CardEditableField';



const CardHeader = props => {
  const { card, editCard } = props;
  return (
    <div className="card__header relative">
      <i className="material-icons">&#xE02F;</i>
      <CardEditableField
        type="title"
        title={card.title}
        editCard={editCard} />
      <CardEditableField
        type="description"
        description={card.description}
        editCard={editCard} />
      <hr />
    </div>
  )
}


CardHeader.propTypes = {
  card: PropTypes.object.isRequired,
  editCard: PropTypes.func.isRequired
}

export default CardHeader;
