import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
      isValid: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      description: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!Boolean(this.state.description)) {
      this.setState({ isValid: false });
      return;
    }

    this.props.createComment({
      description: this.state.description
    });

    this.setState({
      description: '',
      isValid: true
    })
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className="card__comment-form">
        <TextareaAutosize
          minRows={5}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          value={this.state.description} />
        <button type="submit"><i className="material-icons">&#xE163;</i></button>
      </form>
    )
  }
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired
}

export default CommentForm;
