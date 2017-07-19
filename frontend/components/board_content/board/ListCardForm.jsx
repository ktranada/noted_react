import React from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from 'react-textarea-autosize';

class ListCardForm extends React.Component {
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

    this.props.addItem({
      title: this.state.title
    });

    this.setState({
      isAdding: false,
      title: '',
      isBlank: false
    });
  }

  render() {
    let element = null;

    let isList = this.props.type === 'list';

    if (this.state.isAdding) {
      element = (
        <form
          onSubmit={this.handleSubmit}
          className="list-index-add__form">
          <TextareaAutosize
            onChange={this.handleChange}
            autoFocus
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
      element = isList ? (
        <div role="button" onClick={this.handleClick('add')}>
          <i className="material-icons">&#xE145;</i>
          <span>Add a list</span>
        </div>
      ) : (
        <button
          type="button"
          onClick={this.handleClick('add')}
          className="button button-bluegrey-light">
          <i className="material-icons">&#xE145;</i>
        </button>
      )
    }

    return (
      <div className={`list-index__add-button ${this.state.isAdding ? 'open' : ''}`}>
        { element }
      </div>
    )
  }
}

ListCardForm.propTypes = {
  addItem: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
}

export default ListCardForm;
