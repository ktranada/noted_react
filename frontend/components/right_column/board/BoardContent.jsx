import React  from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend  from 'react-dnd-html5-backend';

import { ActionCable } from '../../util/ActionCableProvider';
import ListIndex from './ListIndex';
import ListContainer from './ListContainer';
import Spinner from '../../util/Spinner';
import Scroller from '../../util/Scroller';
import { throttle } from '../../../actions/util';

const propTypes = {
  currentBoard: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,
  createCard: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired
}

class BoardContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prevHoveredListId: -1
    }

    this.scroller = new Scroller();

    this.handleReceived = this.handleReceived.bind(this);
    this.createList = this.createList.bind(this);
    this.createCard = this.createCard.bind(this);
    this.moveCard = throttle(this.moveCard.bind(this), 200);
    this.moveList = this.moveList.bind(this);
    this.updateListPosition = this.updateListPosition.bind(this);
    this.updateCardPosition = this.updateCardPosition.bind(this);
    this.setHoveredListId = this.setHoveredListId.bind(this);
  }

  componentWillMount() {
    const { match, history } = this.props;
    if (!match.isExact) {
      this.props.history.replace(match.url);
    }
  }

  componentDidMount() {
    if (!this.scroller.element) {
      this.scroller.element = document.getElementById('list-index__scroller')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.match.isExact) {
      this.props.history.push(this.props.match.url);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.scroller.element) {
      this.scroller.element = document.getElementById('list-index__scroller')
    }
  }

  componentWillUnmount() {
    this.scroller.stopScrolling();
  }

  handleReceived(data) {
    console.log(data);
  }

  createList(data) {
    const list = Object.assign({}, data, {
      board_id: this.props.match.params.boardId
    })
    return this.props.createList(list);
  }

  createCard(list_id) {
    return (data) => {
      const card = Object.assign({}, data, { list_id });
      return this.props.createCard(card);
    }
  }

  moveCard(cardId, nextListId, nextPos) {
    const { list: previousList } = this.findList(this.state.prevHoveredListId)
    const prevPos = previousList.cards.indexOf(cardId);
    if (prevPos === -1) {
      return;
    }
    this.props.moveCard(cardId, this.state.prevHoveredListId, prevPos, nextListId, nextPos);
    this.setHoveredListId(nextListId);
  }

  moveList(listId, nextPos) {
    if (nextPos === undefined) {
      return;
    }
    const { lastPos } = this.findList(listId);
    this.props.moveList(listId, lastPos, nextPos);
  }

  findList(id) {
    // must always find the list with the current props
    const { lists } = this.props;
    const list = lists.filter(list => list.id === id)[0];
    return {
      lastPos: lists.indexOf(list),
      list
    }
  }

  setHoveredListId(listId) {
    if (this.state.prevHoveredListId !== listId) {
      // We want to retain the previous and next list over multiple drags
      this.setState({
        prevHoveredListId: listId,
      })
    }
  }

  updateListPosition(list) {
    this.props.updateListPosition(list);
  }

  updateCardPosition(card) {
    this.props.updateCardPosition(card);
  }

  render() {
    const cardDragTracker = Object.assign({}, this.state);
    return (
      <div className="board-wrapper">
        {
          this.props.isLoading
            ? <Spinner />
            : (
              <ListIndex
                lists={this.props.lists}
                scroller={this.scroller}
                prevHoveredListId={this.state.prevHoveredListId}
                cardDragTracker={cardDragTracker}
                cardCallbacks={{
                  setHoveredListId: this.setHoveredListId,
                  moveCard: this.moveCard,
                  updateCardPosition: this.updateCardPosition
                }}
                listCallbacks={{
                  createCard: this.createCard,
                  createList: this.createList,
                  moveList: this.moveList,
                  updateListPosition: this.updateListPosition
                }}
              >
                <ActionCable
                  ref="boardChannel"
                  channel={{channel: 'BoardChannel', room: this.props.currentBoard.id}}
                  onReceived={this.handleReceived}
                />
              </ListIndex>
            )
        }
      </div>
    )
  }
}

BoardContent.propTypes = propTypes;

export default DragDropContext(HTML5Backend)(BoardContent);
