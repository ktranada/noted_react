import React from 'react';
import PropTypes from 'prop-types';

import { INVITE_PEOPLE, BOARD_SETTINGS } from '../../../actions/modal_actions';

const propTypes = {
  board: PropTypes.object.isRequired,
  toggleModal: PropTypes.func.isRequired
}

class BoardSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false
    }
    this.dropdownRef = null;

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showDropdown) {
      this.dropdownRef.focus();
    }
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }

  toggleModal(type) {
    return (e) => {
      this.setState({
        showDropdown: false
      });
      this.dropdownRef.blur();
      this.props.toggleModal(type);
    }
  }

  render() {
    const { board } = this.props;
    return (
      <div className="board-configuration">
        <span>{board.title}</span>
        <i
          role="button"
          className="material-icons"
          onClick={this.toggleDropdown}>&#xE5D4;</i>
        <div
          tabIndex={-1}
          onBlur={this.toggleDropdown}
          ref={el => {this.dropdownRef = el; }}
          style={!board.owner ? ({bottom: '-4rem' }) : ({})}
          className={`board-configuration__dropdown ${this.state.showDropdown ? 'open' : ''}`}>
          {
            board.owner &&
            <div role="button"
              onClick={this.toggleModal(INVITE_PEOPLE)}>
              <i className="material-icons">&#xE7FE;</i>
              Invite Members
            </div>
          }
          { board.owner && <hr />}
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
