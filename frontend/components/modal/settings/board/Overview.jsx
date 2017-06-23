import React from 'react';
import PropTypes from 'prop-types';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: this.props.value,
      isValid: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.currentTarget.value,
      isValid: true
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.input.trim()) {
      this.setState({
        isValid: false
      });
      return;
    }

    this.props.updateField({
      id: this.props.id,
      [this.props.field]: this.state.input
    })
  }

  render() {
    return (
      <form
        className="content__board-overview"
        onSubmit={this.handleSubmit}>
        <div className="board-overview__title">
          <label>{this.props.label}
            <input
              className={this.state.isValid ? '' : 'error'}
              onChange={this.handleChange}
              value={this.state.input}/>
          </label>
        </div>
        <button type="submit" className="button button-green">Save</button>
      </form>
    )
  }
}

Overview.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired
}

export default Overview;
