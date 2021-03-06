import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  updateField: PropTypes.func.isRequired,
  note: PropTypes.string
}

const defaultProps = {
  note: ""
}

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: this.props.value,
      errors: [],
      isValid: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.label !== this.props.label) {
      this.setState({
        input: nextProps.value,
        errors: []
      })
    }
  }

  handleChange(e) {
    this.setState({
      input: e.currentTarget.value,
      errors: [],
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
    } else if (this.state.input === this.props.value) {
      return;
    }

    this.props.updateField({
      id: this.props.id,
      [this.props.field]: this.state.input
    }).then(
      () => this.setState({ errors: []}),
      errors => this.setState({ errors })
    )
  }

  render() {

    const hasInputChanged = this.state.input !== this.props.value;
    return (
      <form
        className="content__board-overview"
        onSubmit={this.handleSubmit}
      >
        <div className="board-overview__title">
          <label data-error={this.state.errors[0]}>{this.props.label}
            <input
              className={!this.state.isValid || this.state.errors.length ? 'error' : ''}
              onChange={this.handleChange}
              value={this.state.input}/>
            {this.props.note && <div className="input__note">{this.props.note}</div>}
          </label>
        </div>
        <button
          type="submit"
          disabled={!hasInputChanged}
          className="button button-green">Save</button>
      </form>
    )
  }
}

Overview.propTypes = propTypes;
export default Overview;
