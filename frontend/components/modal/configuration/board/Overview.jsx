import React from 'react';
import PropTypes from 'prop-types';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      isValid: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      title: e.currentTarget.value,
      isValid: true
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.title.trim()) {
      this.setState({
        isValid: false
      });
      return;
    }

    this.props.editBoard({ title: this.state.title})
  }

  render() {
    return (
      <form
        className="content__board-overview"
        onSubmit={this.handleSubmit}>
        <div className="board-overview__logo">
          <div data-title={this.state.title[0]}></div>
          <span>Upload Image</span>
        </div>
        <div className="board-overview__title">
          <label>BOARD NAME
            <input
              className={this.state.isValid ? '' : 'error'}
              onChange={this.handleChange}
              value={this.state.title}/>
          </label>
        </div>
        <button type="submit" className="button button-green">Save</button>
      </form>
    )
  }
}

Overview.propTypes = {
  title: PropTypes.string.isRequired,
  editBoard: PropTypes.func.isRequired
}

export default Overview;
