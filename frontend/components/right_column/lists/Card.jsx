import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = props => {
  const { title, id, boardId } = props;
  return(
    <li>
      <Link to={`/boards/${boardId}/card/${id}`}>
        <div
          role="button"
          className="list__card cursor-pointer">
          <span>{title}</span>
        </div>
      </Link>
    </li>
  )
}

export default Card;
