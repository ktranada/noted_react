import React from 'react';
import PropTypes from 'prop-types';


class BoardConfiguration extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      showDropdown: false
    }

    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  toggleDropdown() {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  }

  render() {
    const { board} = this.props;

    return (
      <div className="board-configuration">
        <span>{board.title}</span>
        <i
          role="button"
          className="material-icons"
          onClick={this.toggleDropdown}>&#xE5D4;</i>
        <div
          className={`board-configuration__dropdown ${this.state.showDropdown ? 'open' : ''}`}>
          <div role="button">
            <i className="material-icons">&#xE7FE;</i>
            Invite People
          </div>
          <hr />
          <div role="button">
            <i className="material-icons">&#xE8B8;</i>
            Settings
          </div>
        </div>
      </div>
    )
  }
}

BoardConfiguration.proptypes = {
  board: PropTypes.object.required
}

export default BoardConfiguration;
