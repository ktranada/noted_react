import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import CardTitle from './CardTitle';

class CardDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasDescription: Boolean(this.props.value),
    }

    this.handleDescription = this.handleDescription.bind(this);
    this.toggleDescription = this.toggleDescription.bind(this);
  }

  handleDescription(e) {
    this.props.updateField(e)
    this.setState({ hasDescription: e.currentTarget.value.trim().length > 0 });
  }

  toggleDescription(e) {
    this.setState({ hasDescription: true });
  }

  render() {
    let description = null;

    if (this.state.hasDescription) {
      description = (
        <CardTitle
          initialFocus={this.props.value.length === 0}
          focusTextarea={this.props.focusTextarea}
          updateField={this.handleDescription}
          handleChange={this.props.handleChange}
          value={this.props.value}
          isFocused={this.props.isFocused} />
      )
    } else {
      description = (
        <div
          role="button"
          className="card-header__description-prompt"
          onClick={this.toggleDescription}>
          Edit description
        </div>
      )
    }

    return (
      <div className="card-header__description">
        <i className="material-icons">&#xE8D2;</i>
        { description }
      </div>
    )
  }
}

CardDescription.propTypes = {
  value: PropTypes.string.isRequired,
  isFocused: PropTypes.bool.isRequired,
  updateField: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  updateField: PropTypes.func.isRequired
}


export default CardDescription;
