import { connect } from 'react-redux';
import { createCard } from '../../../actions/board_content_actions';
import { asArrayByOrder, getCurrentBoardById } from '../../../reducers/selectors';
import { toggleModal, VIEW_CARD } from '../../../actions/modal_actions';

import List from './List';

const mapStateToProps = ({ cards }, {list}) => {
  const listCards = asArrayByOrder(cards, list.cards);
  return({
    cards: listCards
  })
}

const mapDispatchToProps = dispatch => ({
  createCard: card => createCard(card)(dispatch),
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List)
