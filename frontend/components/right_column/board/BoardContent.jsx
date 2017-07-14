import React  from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend  from 'react-dnd-html5-backend';

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

    this.addList = this.addList.bind(this);
    this.addCard = this.addCard.bind(this);
    this.moveCard = throttle(this.moveCard.bind(this), 200);
    this.moveList = this.moveList.bind(this);
    this.updateListOrder = this.updateListOrder.bind(this);
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

  setHoveredListId(listId) {
    if (this.state.prevHoveredListId !== listId) {
      // We want to retain the previous and next list over multiple drags
      this.setState({
        prevHoveredListId: listId,
      })
    }
  }

  addList(data) {
    const list = Object.assign({}, data, {
      board_id: this.props.match.params.boardId
    })
    return this.props.createList(list);
  }

  addCard(list_id) {
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

  updateListOrder() {
    const lists = {
      ids: []
    };
    this.props.lists.forEach(({ id }, position) => {
      lists[id] = position;
      lists.ids.push(id);
    });
    this.props.updateListOrder(lists);
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
                  addCard: this.addCard,
                  addList: this.addList,
                  moveList: this.moveList,
                  updateListOrder: this.updateListOrder
                }} />
            )
        }
      </div>
    )
  }
}

BoardContent.propTypes = propTypes;

export default DragDropContext(HTML5Backend)(BoardContent);
