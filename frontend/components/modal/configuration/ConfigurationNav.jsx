import React from 'react';
import PropTypes from 'prop-types';

const createNavLink = (tab, currentTab, handleTabChange) => {
  const active = tab === currentTab ? 'active' : '';
  return <li key={tab} className={active} onClick={active ? null : handleTabChange(tab)}>{tab}</li>;
};


const ConfigurationNav = ({tabs, currentTab, header, handleTabChange, bottomAction}) =>  {
  const navLinks = tabs.map(tab => createNavLink(tab, currentTab, handleTabChange));
  return (
    <nav className="configuration__nav">
      <span className="nav__header">{header}</span>
      <ul>
        { navLinks }
      </ul>
      <div className="nav__action">
        { bottomAction }
      </div>
    </nav>
  )
}

ConfigurationNav.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  header: PropTypes.string.isRequired,
  currentTab: PropTypes.string.isRequired,
  handleTabChange: PropTypes.func.isRequired,
  bottomAction: PropTypes.element.isRequired,
}

export default ConfigurationNav;
