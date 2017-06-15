import React from 'react';

class CreateBoardContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      username: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [field]: e.currentTarget.value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const board = Object.assign({}, this.state);
    this.props.createBoard(board);
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
          </label>

          <label>USERNAME
            <input
              type="text"
              value={this.state.username}
              onChange={this.handleChange('username')}/>
          </label>
        </div>

        <footer>
          <div onClick={this.props.handleBackClick}>
            <i className="material-icons">&#xE5C4;</i>BACK
            </div>
          <button type="submit" className="button button-green">Create</button>
        </footer>
      </form>
    )
  }
}

export default CreateBoardContent;
