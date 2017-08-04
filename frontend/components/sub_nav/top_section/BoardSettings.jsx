import React from 'react';
import PropTypes from 'prop-types';

import { INVITE_PEOPLE, BOARD_SETTINGS } from '../../../actions/modal_actions';

const propTypes = {
  board: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  isOwner: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired
}

class BoardSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      isDropdownFocused: false
    }
    this.dropdownRef = null;

    this.handleBlur = this.handleBlur.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidUpdate(prevProps, { showDropdown, isDropdownFocused }) {
    if (this.state.showDropdown) {
      this.dropdownRef.focus();
    }
  }

  toggleDropdown(e) {
    const { showDropdown, isDropdownFocused } = this.state;
    if ((showDropdown && !isDropdownFocused)) {
      this.setState({
        showDropdown: false,
      })
    } else  {
      this.setState({
        showDropdown: true,
        isDropdownFocused: true
      })

    }
  }

  toggleModal(type) {
    return (e) => {
      this.setState({
        showDropdown: false,
        isDropdownFocused: false
      });
      this.props.toggleModal(type)(e);
    }
  }

  handleBlur(e) {
    this.setState({ isDropdownFocused: false });
  }

  render() {
    const { title, isOwner } = this.props;
    return (
      <div className="board-configuration">
        <div data-title={title}>{title}</div>
        <i
          role="button"
          className="material-icons"
          onClick={this.toggleDropdown}>&#xE5D4;</i>
        <div
          tabIndex={-1}
          onBlur={this.handleBlur}
          ref={el => {this.dropdownRef = el; }}
          className={`board-configuration__dropdown ${this.state.showDropdown && this.state.isDropdownFocused ? 'open' : ''}`}>
          {
            isOwner &&
            <div role="button"
              onClick={this.toggleModal(INVITE_PEOPLE)}>
              <i className="material-icons">&#xE7FE;</i>
              Invite Members
            </div>
          }
          { isOwner && <hr />}
          <div role="button" onClick={this.toggleModal(BOARD_SETTINGS)}>
            <i className="material-icons">&#xE8B8;</i>
            Settings
          </div>
        </div>
      </div>
    )
  }
}

BoardSettings.proptypes = propTypes;

export default BoardSettings;
