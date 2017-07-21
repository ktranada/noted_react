import React from 'react';
import PropTypes from 'prop-types';
import CardEditableField from './CardEditableField';

const propTypes = {
  card: PropTypes.object.isRequired,
  editCard: PropTypes.func.isRequired
}

const Header = props => {
  const { card, editCard } = props;
  return (
    <div className="card__header relative">
      <i className="material-icons">&#xE02F;</i>
      <CardEditableField
        type="title"
        value={card.title}
        isRequired={true}
        editCard={editCard} />
      <CardEditableField
        type="description"
        value={card.description}
        isRequired={false}
        editCard={editCard} />
      <hr />
    </div>
  )
}


Header.propTypes = propTypes;

export default Header;
