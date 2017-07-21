import { connect } from 'react-redux';
import { asArrayByOrder } from '../../../reducers/selectors';

import List from './List';

const mapStateToProps = ({ cards }, {list}) => {
  const listCards = asArrayByOrder(cards, list.cards);
  return({
    cards: listCards
  })
}
export default connect(
  mapStateToProps,
)(List)
