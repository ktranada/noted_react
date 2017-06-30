import React from 'react';
import SubmitButton from '../../form_elements/SubmitButton';
import InlineInput from '../../form_elements/InlineInput';

class CreateBoardContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      username: '',
      errors: {},
      isSubmitting: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      const errors = Object.assign({}, this.state.errors);
      errors[field] = '';
      this.setState({
        [field]: e.currentTarget.value,
        errors
      });
    }
  }

  verifyInputPresence() {
    let titleError, usernameError;
    if (!this.state['username'].trim()) {
      usernameError = 'Username cannot be blank';
    }

    if (!this.state['title'].trim()) {
      titleError = 'Title cannot be blank';
    }

    if (usernameError || titleError) {
      this.setState({
        errors: { username: usernameError, title: titleError }
      })
      return false;
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.isSubmitting || !this.verifyInputPresence()) {
      return;
    }
    const board = {
      title: this.state.title,
      username: this.state.username
    }
    this.props.createBoard(board).then(
      board => {
        this.props.history.push(`/boards/${board.id}`)
      },
      error => {
        this.setState({
          isSubmitting: false,
          errors: { username: error['username'] || ''  }
        })
      }
    );

    this.setState({ isSubmitting: true });
  }

  render() {
    const { isSubmitting } = this.state;
    return (
      <form className="board-form-create" onSubmit={this.handleSubmit}>
        <header>CREATE A BOARD</header>
        <p>By creating a board, you will be able to organize your work into lists and for each list, you may add cards detailing tasks to be done. </p>
        <div className="board-form-create__inputs">
          <InlineInput
            darkText
            hasCustomErrors
            label="BOARD NAME"
            value={this.state.title}
            error={this.state.errors['title']}
            handleChange={this.handleChange('title')}>
            {this.state.errors['title'] && <p className="error">{this.state.errors['title']}</p>}
          </InlineInput>

          <InlineInput
            darkText
            hasCustomErrors
            label="USERNAME"
            value={this.state.username}
            error={this.state.errors['username']}
            handleChange={this.handleChange('username')}>
            {this.state.errors['username'] && <p className="error">{this.state.errors['username']}</p>}
            <p>Username can only contain lowercase letters and numbers.</p>
          </InlineInput>
        </div>

        <footer>
          <div onClick={this.props.handleBackClick}>
            <i aria-hidden className="material-icons">&#xE5C4;</i>BACK
            </div>
          <SubmitButton disabled={isSubmitting} buttonColorClass="button-green" buttonText="Create" />
        </footer>
      </form>
    )
  }
}


export default CreateBoardContent;
