import React from 'react';

class CreateBoardContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      username: '',
      error: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      const error = Object.assign({}, this.state.error);
      error[field] = '';
      this.setState({
        [field]: e.currentTarget.value,
        error
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
        error: { username: usernameError, title: titleError }
      })
      return false;
    }
    return true;
  }

  handleSubmit(e) {
    e.preventDefault();
    const error = {};
    if (!this.verifyInputPresence()) {
      return;
    }

    const board = {
      title: this.state.title,
      username: this.state.username
    }
    this.props.createBoard(board).then(
      board => this.props.history.push(`/boards/${board.id}`),
      error => {
        console.log(error);
        this.setState({
          error: { username: error['username'] || ''  }
        })
      }
    );
  }

  render() {
    return (
      <form className="board-form-create" onSubmit={this.handleSubmit}>
        <header>CREATE A BOARD</header>
        <p>By creating a board, you will be able to organize your work into lists and for each list, you may add cards detailing tasks to be done. </p>
        <div className="board-form-create__inputs">
          <label>BOARD NAME
            <input
              type="text"
              value={this.state.title}
              onChange={this.handleChange('title')}/>
            {this.state.error['title'] && <p className="error">{this.state.error['title']}</p>}
          </label>

          <label>USERNAME
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange('username')}/>
            {this.state.error['username'] && <p className="error">{this.state.error['username']}</p>}
            <p>Username can only contain lowercase letters and numbers.</p>
          </label>
        </div>

        <footer>
          <div onClick={this.props.handleBackClick}>
            <i aria-hidden className="material-icons">&#xE5C4;</i>BACK
            </div>
          <button type="submit" className="button button-green">Create</button>
        </footer>
      </form>
    )
  }
}

export default CreateBoardContent;
