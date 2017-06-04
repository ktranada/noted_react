import React from 'react';

const BoardConfiguration = (props) => {
  const { id, title } = props;
  return (
    <div className="board-actions__configuration">
      <span>{title}</span>
      <i className="material-icons">&#xE5D4;</i>
    </div>
  )
}

export default BoardConfiguration;
