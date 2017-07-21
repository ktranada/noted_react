import React  from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend  from 'react-dnd-html5-backend';

import { ActionCable } from '../../util/ActionCableProvider';
import BoardContentActionCable from './BoardContentActionCable';
import ListIndex from './ListIndex';
import ListContainer from './ListContainer';
import Spinner from '../../util/Spinner';
import Scroller from '../../util/Scroller';
import { throttle } from '../../../actions/util';

const propTypes = {
  currentBoard: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,

  requestLists: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
  updateCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
}

class BoardContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prevHoveredListId: -1
    }

    this.scroller = new Scroller();

    this.createList = this.createList.bind(this);
    this.createCard = this.createCard.bind(this);
    this.editList = this.editList.bind(this);
    this.moveCard = throttle(this.moveCard.bind(this), 200);
    this.moveList = this.moveList.bind(this);
    this.updateListPosition = this.updateListPosition.bind(this);
    this.updateCardPosition = this.updateCardPosition.bind(this);
    this.setHoveredListId = this.setHoveredListId.bind(this);
  }

  componentWillMount() {
    const { match, history, currentBoard } = this.props;
    if (!match.isExact) {
      this.props.history.replace(match.url);
    }

    if (currentBoard.isLoaded && !currentBoard.has_loaded_lists) {
      this.props.requestLists();
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
    const { currentBoard: nextBoard } = nextProps;
    if (!nextProps.isLoadingLists && nextBoard.isLoaded && !nextBoard.has_loaded_lists) {
      nextProps.requestLists();
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

  createList(data) {
    const list = Object.assign({}, data, {
      board_id: this.props.match.params.boardId,
      updated_by: this.props.currentUserId
    })
    this.boardContentCableRef.perform('create_list', list);
  }

  createCard(list_id) {
    return (data) => {
      const card = Object.assign({}, data, {
        list_id,
        updated_by: this.props.currentUserId,
        board_id: this.props.currentBoard.id
      });
      this.boardContentCableRef.perform('create_card', card);
    }
  }

  editList(list) {
    this.boardContentCableRef.perform('edit_list', list);
  }

  moveList(listId, nextPos) {
    if (nextPos === undefined) {
      return;
    }
    const { lastPos } = this.findList(listId);
    this.props.moveList(listId, lastPos, nextPos);
  }

  moveCard(cardId, nextListId, nextPos, defaultPrevListId = -1) {
    const prevListId = defaultPrevListId !== -1
      ? defaultPrevListId
      : this.state.prevHoveredListId;

    const { list: previousList } = this.findList(prevListId)
    const prevPos = previousList.cards.indexOf(cardId);
    if (prevPos === -1) {
      return;
    }
    this.props.moveCard(cardId, prevListId, prevPos, nextListId, nextPos);

    if (defaultPrevListId === -1) {
      // Changes were made by current user
      this.setHoveredListId(nextListId);
    }
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
    list['updated_by'] = this.props.currentUserId;
    this.boardContentCableRef.perform('update_list_position', list);
  }

  updateCardPosition(card) {
    card['updated_by'] = this.props.currentUserId;
    card['board_id'] = this.props.currentBoard.id;
    this.boardContentCableRef.perform('update_card_position', card);
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
                  editList: this.editList,
                  moveList: this.moveList,
                  updateListPosition: this.updateListPosition
                }}
              >
                <BoardContentActionCable
                  boardContentCableRef={el => this.boardContentCableRef = el}
                  currentUserId={this.props.currentUserId}
                  currentBoardId={this.props.currentBoard.id}
                  historyPush={this.props.history.push}
                  listCallbacks={{
                    addList: this.props.addList,
                    moveList: this.moveList,
                    updateList: this.props.updateList
                  }}
                  cardCallbacks={{
                    moveCard: this.moveCard,
                    addCard: this.props.addCard,
                    updateCard: this.props.updateCard,
                    removeCard: this.props.removeCard
                  }}
                  commentCallbacks={{
                    addComment: this.props.addComment
                  }}
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
