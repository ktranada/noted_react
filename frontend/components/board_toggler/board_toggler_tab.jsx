import React from 'react';
import { Link } from 'react-router-dom';

const BoardTogglerTab = props => {
  const {title, onclick, isCurrentBoard} = props;
  return (
    <li className={`board-toggle__item ${isCurrentBoard ? "active" : ""}`}>
      <div onClick={onclick}>
        {title[0].toUpperCase()}
      </div>
    </li>
  )
}

export default BoardTogglerTab;
