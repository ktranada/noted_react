import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import Title from './Title';
import Description from './Description';

const EDITABLE_COMPONENTS = {
  'title': Title,
  'description': Description
}

class CardEditableField extends React.Component {
  constructor(props) {
    super(props);

    this.focusTextarea = this.focusTextarea.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateField = this.updateField.bind(this);
    this.isValidEdit = this.isValidEdit.bind(this);

    this.state = {
      [this.props.type]: this.props.value,
      isValid: this.props.isRequired ? Boolean(this.props.value) : true,
      isFocused: false
    }
  }

  focusTextarea(e) {
    this.setState({ isFocused: true})
  }

  isValidEdit() {
    return this.props.isRequired ? Boolean(this.state[this.props.type]) : true;
  }

  handleChange(e) {
    this.setState({
      [this.props.type]: e.currentTarget.value,
      isFocused: true,
      isValid: true
    })
  }

  updateField(e) {
    if (!this.isValidEdit()) {
      this.setState({
        isValid: false
      })
      return;
    }

    this.setState({
      isFocused: false
    });

    const { type, value } = this.props;

    if (value === this.state[type]) {
      return;
    }

    this.props.editCard({
      [type]: this.state[type].trim()
    });
  }

  render() {
    const Component = EDITABLE_COMPONENTS[this.props.type];

    if (typeof Component === 'undefined') return null;

    return (
      <Component
        focusTextarea={this.focusTextarea}
        updateField={this.updateField}
        handleChange={this.handleChange}
        value={this.state[this.props.type]}
        isFocused={this.state.isFocused}
        isValid={this.state.isValid}/>
    )
  }
}

CardEditableField.propTypes = {
  type: PropTypes.string.isRequired,
  isRequired: PropTypes.bool.isRequired,
  editCard: PropTypes.func.isRequired
}


export default CardEditableField;
