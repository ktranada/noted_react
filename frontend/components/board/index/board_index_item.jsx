import React from 'react';
import { Link } from 'react-router-dom';

const BoardIndexItem = props => {
  const {id, title, onclick, isCurrentBoard} = props;
  return (
    <li className={`board-toggle__item ${isCurrentBoard ? "active" : ""}`}>
      <div onClick={onclick}>
        {title[0].toUpperCase()}
      </div>
    </li>
  )
}

export default BoardIndexItem;
