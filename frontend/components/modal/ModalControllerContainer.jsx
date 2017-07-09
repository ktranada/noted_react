import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ModalController from './ModalController';
import { toggleModal } from '../../actions/modal_actions';

const mapStateToProps = ({ currentModal: { modal, options }}) => {
  return ({
    modal,
    options
  })
};

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(toggleModal(null))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalController));
