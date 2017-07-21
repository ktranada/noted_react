import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import TextareaAutosize from 'react-textarea-autosize';

import ListActions from './ListActions';
import Cards from './Cards';
import ListCardForm from './ListCardForm';


const propTypes = {
  prevHoveredListId: PropTypes.number.isRequired,
  list: PropTypes.object.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  listCallbacks: PropTypes.shape({
    createCard: PropTypes.func.isRequired,
    editList: PropTypes.func.isRequired,
    moveList: PropTypes.func.isRequired,
    updateListPosition: PropTypes.func.isRequired,
    destroyList: PropTypes.func.isRequired
  }).isRequired,
  cardCallbacks: PropTypes.shape({
    setHoveredListId: PropTypes.func.isRequired,
    moveCard: PropTypes.func.isRequired,
  }).isRequired
}

const dropSpecs = {
  drop(props, monitor, component) {
    if (monitor.getItemType() === 'card') {
      const id = monitor.getItem().id;
      const {
        id: list_id,
        cards
       } = props;

      const position = cards.length === 0 ? 0 : cards.findIndex(card => card.id === id)
       return {
         id,
         list_id,
         position
       };
    }

    const { id, position } = monitor.getItem();
    const { position: nextPosition } = props;

    if (position !== nextPosition) {
      return {
        id,
        position: nextPosition
      }
    }
    return null;
  },
  hover(props, monitor, component) {
    const { id } = monitor.getItem();
    if (monitor.getItemType() === 'list') {

      const { id: nextListId } = props;
      if (id !== nextListId) {
        props.listCallbacks.moveList(id, props.position);
      }
      return;
     }

     if (props.id !== props.prevHoveredListId && monitor.getClientOffset().y > component.listItem.offsetHeight - 50){
       // Add card to end of list if the drag source is below it
       props.cardCallbacks.moveCard(id, props.id, props.cards.length)
     }
  }
}

const dropCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    item: monitor.getItem(),
    isOver: monitor.isOver(),
    type: monitor.getItemType()
  }
}

const dragSpecs = {
  beginDrag({ list, position }, monitor, component) {
    return ({ id: list.id, position })
  },

  endDrag(props, monitor, component) {
    const dropResult = monitor.getDropResult();
    if (dropResult === null || !dropResult.id) return;

    props.listCallbacks.updateListPosition(dropResult);
  },
}

class List extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.list.title,
      isEditing: false,
      isBlank: false,
      showDropdown: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleListDropdown = this.toggleListDropdown.bind(this);

    this.listActionsRef = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showDropdown) {
      this.listActionsRef.focus();
    }
  }

  handleChange(e) {
    this.setState({
      title: e.currentTarget.value,
      isBlank: false
    })
  }

  handleSubmit(e) {
    if (this.props.title === this.state.title) {
      this.toggleEdit();
      return;
    }

    if (!this.state.title.trim()) {
      this.setState({ isBlank: true });
      return;
    }

    this.props.listCallbacks.editList({
      id: this.props.list.id,
      title: this.state.title
    });
    this.toggleEdit();
  }

  toggleEdit() {
    this.setState({
      isEditing: !this.state.isEditing,
    })
  }

  toggleListDropdown(hide = false) {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }

  render() {
    const {
      list,
      cards,
      connectDragSource,
      connectDropTarget,
      isDragging,
      item,
      isOver,
      type,
      cardCallbacks,
      listCallbacks,
      prevHoveredListId
    } = this.props;

    const { clientHeight = 0 } = item || {};

    return connectDropTarget(
      <div className="list-index__item-wrapper">
        {
          connectDragSource(
            <div
              ref={el => this.listItem = el}
              className={`list-index__item ${isDragging ? "placeholder" : ""}`}>
              <div className="list__header">
                {
                  this.state.isEditing
                    ? (
                      <TextareaAutosize
                        onChange={this.handleChange}
                        autoFocus
                        onBlur={this.handleSubmit}
                        value={this.state.title}
                        className={this.state.isBlank ? 'error' : ''}
                        placeholder="Title"
                      />
                    )
                    : <header onClick={this.toggleEdit}>{list.title}</header>
                }
                <i onClick={this.toggleListDropdown} className="material-icons">&#xE5D4;</i>
                {
                  this.state.showDropdown &&
                  <ListActions
                    listActionsRef={el => this.listActionsRef = el }
                    toggleListDropdown={this.toggleListDropdown}
                    destroyList={listCallbacks.destroyList(list.id)}
                  />
                }
              </div>

              <hr />
              <Cards
                list={list}
                cards={cards}
                height={clientHeight}
                prevHoveredListId={prevHoveredListId}
                isCardOver={isOver && type ==='card'}
                cardDragTracker={this.props.cardDragTracker}
                cardCallbacks={this.props.cardCallbacks}
              />
              <ListCardForm type="card" addItem={this.props.listCallbacks.createCard(list.id)} />
            </div>
          )
        }
      </div>
    )
  }
}

List.propTypes = propTypes;

export default DragSource(
  'list', dragSpecs, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }))(DropTarget(['list', 'card'], dropSpecs, dropCollect)(List));
