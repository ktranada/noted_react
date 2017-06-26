import React from 'react';
import { NavLink } from 'react-router-dom';

const NavTab = props => {
  const {id, title } = props;
  return (
    <li className="nav__tab">
      <NavLink to={`/boards/${id}`}>
        {title[0].toUpperCase()}
      </NavLink>
    </li>
  )
}

export default NavTab;
