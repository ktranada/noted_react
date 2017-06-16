import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

class ListAddForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdding: false,
      title: '',
      isBlank: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      title: e.currentTarget.value,
      isBlank: false
    })
  }

  handleClick(type) {
    return (e) => {
      let nextState = null;
      if (type === 'cancel') {
        nextState = { isAdding: false, title: '', isBlank: true }
      } else if (type === 'add') {
        nextState = { isAdding: true, isBlank: false }
      } else {
        return;
      }

      this.setState(nextState);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.title.trim().length === 0) {
      this.setState({ isBlank: true });
      return
    }

    this.props.createList({
      title: this.state.title
    }).then(list => this.setState({
      isAdding: false,
      title: '',
      isBlank: false
    }));
  }

  render() {
    let element = null;

    if (this.state.isAdding) {
      element = (
        <form
          onSubmit={this.handleSubmit}
          className="board-lists-add__form">
          <TextareaAutosize
            onChange={this.handleChange}
            value={this.state.title}
            className={this.state.isBlank ? 'error' : ''}
            placeholder="Title"/>
          <div className="board-list-add__actions">
            <button
              type="button"
              onClick={this.handleClick('cancel')}
              className="button button-red small"><i className="material-icons">&#xE14C;</i></button>
            <button type="submit" className="button-green small"><i className="material-icons">&#xE145;</i></button>
          </div>
        </form>
      )
    } else {
      element = (
        <div role="button" onClick={this.handleClick('add')}>
          <i className="material-icons">&#xE145;</i>
          <span>Add a list</span>
        </div>
      )
    }

    return (
      <div className={`board-lists__add-button ${this.state.isAdding ? 'open' : ''}`}>
        { element }
      </div>
    )
  }
}

ListAddForm.propTypes = {
  createList: PropTypes.func.isRequired
}

export default ListAddForm;
