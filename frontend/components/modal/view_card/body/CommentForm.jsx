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

    this.props.addComment({
      card_id: this.props.cardId,
      description: this.state.description
    });
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} className="card__comment-form">
        <TextareaAutosize
          minRows={5}
          onChange={this.handleChange}
          value={this.state.description} />
        <button type="submit"><i className="material-icons">&#xE163;</i></button>
      </form>
    )
  }
}

CommentForm.propTypes = {
  cardId: PropTypes.number.isRequired,
  addComment: PropTypes.func.isRequired
}

export default CommentForm;
