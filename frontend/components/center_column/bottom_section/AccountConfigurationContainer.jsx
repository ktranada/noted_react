import {connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AccountConfiguration from './AccountConfiguration';

const mapStateToProps = ({session}) => ({
  currentUser: session.currentUser
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(AccountConfiguration));
