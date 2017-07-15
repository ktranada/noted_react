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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if ((e.metaKey && e.which === 13 ) || (e.which === 13 && !e.shiftKey)) {
      this.handleSubmit(e);
      return;
    }

    this.setState({
      description: e.currentTarget.value,
      isValid: true
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
          className={this.state.isValid ? '' : 'error'}
          onKeyDown={this.handleChange}
          onChange={this.handleChange}
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
