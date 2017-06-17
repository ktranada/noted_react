import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import CardTitle from './CardTitle';
import CardDescription from './CardDescription';

const EDITABLE_COMPONENTS = {
  'title': CardTitle,
  'description': CardDescription
}

class CardEditableField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      [this.props.type]: this.props[this.props.type],
      isFocused: false
    }


    this.focusTextarea = this.focusTextarea.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateField = this.updateField.bind(this);
  }

  focusTextarea(e) {
    this.setState({ isFocused: true})
  }

  handleChange(e) {
    this.setState({
      [this.props.type]: e.currentTarget.value,
      isFocused: true
    })
  }

  updateField(e) {
    this.setState({
      isFocused: false
    });

    const { type } = this.props;

    if (this.props[type] === this.state[type]) {
      return;
    }

    this.props.editCard({
      [type]: this.state[type]
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
        isFocused={this.state.isFocused}/>
    )
  }
}

CardEditableField.propTypes = {
  type: PropTypes.string.isRequired,
  editCard: PropTypes.func.isRequired
}


export default CardEditableField;
