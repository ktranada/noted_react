import React from 'react';
import PropTypes from 'prop-types';

import { ADD_BOARD } from '../../actions/modal_actions';
import NavTab  from './NavTab';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (!this.props.isLanding) {
      this.requestBoard(this.props.currentBoardId, this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentBoardId !== this.props.currentBoardId) {
      this.requestBoard(nextProps.currentBoardId, nextProps);
    }
  }

  requestBoard(boardId, { boardIsLoaded, boardIsLoading }) {
    if (!boardIsLoaded && !boardIsLoading) {
      this.props.requestBoard(boardId);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true
  }

  render() {
    let { boards, currentBoardId } = this.props;
    const boardsList = boards.map((board) => <NavTab key={board.id} {...board } />);

    let boardFormButton = null;
    if (boardsList.length < 3) {
      boardFormButton = (
        <li className="navbar__button">
          <div role="button" onClick={this.props.toggleModal(ADD_BOARD)}>
            <i className="material-icons">&#xE145;</i>
          </div>
        </li>
      )
    }

    return (
      <ul className="navbar">
        {boardsList}
        {boardFormButton}
      </ul>
    );
  }
}

Nav.propTypes = {
  boards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequred
  }).isRequired).isRequired,
  boardIsLoaded: PropTypes.bool.isRequired,
  boardIsLoading: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  requestBoard: PropTypes.func.isRequired,
  isLanding: PropTypes.bool.isRequired
}

export default Nav;
