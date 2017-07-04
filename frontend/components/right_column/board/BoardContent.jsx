import React  from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend  from 'react-dnd-html5-backend';

import ListIndex from './ListIndex';
import ListContainer from './ListContainer';
import Spinner from '../../misc/Spinner';

import { throttle } from '../../../actions/util';


class BoardContent extends React.Component {
  constructor(props) {
    super(props);

    this.addList = this.addList.bind(this);
    this.addCard = this.addCard.bind(this);
    this.moveCard = throttle(this.moveCard.bind(this), 1000); //throttle(this.moveList.bind(this), 1000);
    this.moveList = this.moveList.bind(this); //throttle(this.moveList.bind(this), 1000);
    this.updateListOrder = this.updateListOrder.bind(this);
  }

  componentWillMount() {
    const { match, history } = this.props;
    if (!match.isExact) {
      this.props.history.replace(match.url);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.match.isExact) {
      this.props.history.push(this.props.match.url);
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

  moveCard(cardId, lastListId, nextListId, nextCardPos) {
    const { list: previousList } = this.findList(lastListId)
    const lastCardPos = previousList.cards.indexOf(cardId);

    if (lastCardPos === -1) return;

    this.props.moveCard(cardId, lastListId, lastCardPos, nextListId, nextCardPos);
  }

  moveList(listId, nextPos) {
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



  render() {
    return (
      <div className="board-wrapper">
        {
          this.props.isLoading
            ? <Spinner />
            : (
              <ListIndex
                lists={this.props.lists}
                cardCallbacks={{
                  moveCard: this.moveCard
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

BoardContent.propTypes = {
  currentBoard: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,
  createCard: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired
}

export default DragDropContext(HTML5Backend)(BoardContent);
