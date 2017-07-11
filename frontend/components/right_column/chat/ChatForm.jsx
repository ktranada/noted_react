import React from 'react';
import PropTypes from 'prop-types';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';

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
    this.setState({
      content: e.currentTarget.innerText
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
      () => this.setState({ content: '', isValid: true })
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ContentEditable
          value={this.state.content}
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

// <TextareaAutosize
//   value={this.state.content}
//   className={this.state.isValid ? '' : 'error'}
//   placeholder="Jet fuel melts steel beams"
//   maxRows={6}
//   onChange={this.handleChange} />
ChatForm.propTypes = propTypes;

export default ChatForm;
