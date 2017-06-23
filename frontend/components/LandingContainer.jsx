import { connect } from 'react-redux';
import { toggleModal } from '../actions/modal_actions';
import Landing from './Landing';

const mapStateToProps = ({ boards }) => ({
  boardCount: Object.keys(boards.byId).length
});

const mapDispatchToProps = (dispatch) => ({
  toggleModal: (type) => dispatch(toggleModal(type)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
