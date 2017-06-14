import React from 'react';
import { Link } from 'react-router-dom';

const BoardTogglerTab = props => {
  const {title, onclick, isCurrentBoard, isButton } = props;

  let element = null;

  if (isButton) {
    return (
      <li className="board-toggle__button">
        <div onClick={onclick}>
          <i className="material-icons">&#xE145;</i>
        </div>
      </li>
    )
  }

  return (
    <li className={`board-toggle__tab ${isCurrentBoard ? "active" : ""}`}>
      <div onClick={onclick}>
        {title[0].toUpperCase()}
      </div>
    </li>
  )
}

export default BoardTogglerTab;
