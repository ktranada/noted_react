import React  from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend  from 'react-dnd-html5-backend';

import ListIndex from './ListIndex';
import ListContainer from './ListContainer';
import Spinner from '../../misc/Spinner';

class BoardContent extends React.Component {
  constructor(props) {
    super(props);

    this.addList = this.addList.bind(this);
    this.addCard = this.addCard.bind(this);
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

  render() {
    return (
      <div className="board-wrapper">
        {
          this.props.isLoading
            ? <Spinner />
            : (
              <ListIndex
                lists={this.props.lists}
                isLoading={this.props.isLoading}
                addCard={this.addCard}
                addList={this.addList} />              
            )
        }
      </div>
    )
  }
}

BoardContent.propTypes = {
  lists: PropTypes.array.isRequired,
  createCard: PropTypes.func.isRequired,
  createList: PropTypes.func.isRequired,
}

export default DragDropContext(HTML5Backend)(BoardContent);
