import React from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';

const ENTER = 13;

const propTypes = {
  sendMessage: PropTypes.func.isRequired
}

class ChatForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      isValid: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    if ((e.shiftKey || e.metaKey) && e.which === ENTER) {
      this.handleSubmit(e);
      return;
    }
    this.setState({
      content: e.currentTarget.innerHTML
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.content.trim()) {
      this.setState({
        isValid: false
      });
      return;
    }

    this.props.sendMessage({ content: this.state.content }).then(
      () => {
        this.setState({ content: '', isValid: true })
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ContentEditable
          onKeyDown={this.handleChange}
          onKeyPress={this.handleChange}
          html={this.state.content}
          onChange={this.handleChange}
        />
        <i
          role="button"
          onClick={this.handleSubmit}
          className="material-icons send"
        >&#xE163;</i>

      </form>
    )
  }
}

ChatForm.propTypes = propTypes;

export default ChatForm;
