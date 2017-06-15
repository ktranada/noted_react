import React from 'react';
import { Link } from 'react-router-dom';

const BoardTogglerTab = props => {
  const {title, handleClick, isCurrentBoard, isButton } = props;

  if (isButton) {
    return (
      <li className="board-toggle__button">
        <div onClick={handleClick}>
          <i className="material-icons">&#xE145;</i>
        </div>
      </li>
    )
  }

  return (
    <li className={`board-toggle__tab ${isCurrentBoard ? "active" : ""}`}>
      <div onClick={handleClick}>
        {title[0].toUpperCase()}
      </div>
    </li>
  )
}

export default BoardTogglerTab;
