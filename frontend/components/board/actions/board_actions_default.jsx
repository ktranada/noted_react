import React from 'react';

const BoardActionsDefault = (props) => (
  <div className="board-actions-default">
    <span>VIEW BOARD</span>
    <div className="board-actions-default__chat">
      <span>CHAT</span>
      <ul >
        <li clasName="chat-group">CHANNELS
          <ul>
            <li></li>
            <li></li>
          </ul>
        </li>
        <li className="chat-group">DIRECT MESSAGES
          <ul>
            <li></li>
            <li></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
)
export default BoardActionsDefault;
