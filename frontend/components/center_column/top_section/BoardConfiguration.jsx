import React from 'react';

const BoardConfiguration = (props) => {
  const { id, title } = props;
  return (
    <div className="board-configuration">
      <span>{title}</span>
      <i role="button" className="material-icons">&#xE5D4;</i>
    </div>
  )
}

export default BoardConfiguration;
