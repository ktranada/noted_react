import React from 'react';
import PropTypes from 'prop-types';

const Card = props => {
  return(
    <li>
      <div
        role="button"
        className="list__card cursor-pointer"
        onClick={props.viewCard} >
        <span>{props.title}</span>
      </div>
    </li>
  )
}

export default Card;
