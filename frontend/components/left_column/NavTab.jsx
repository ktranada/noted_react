import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

function NavTab(props){
  const {id, title } = props;
  return (
    <li className="navbar__tab">
      <NavLink to={`/boards/${id}`}>
        {title[0].toUpperCase()}
      </NavLink>
    </li>
  )
}

NavTab.propTypes = propTypes;

export default NavTab;
