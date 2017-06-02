import {connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import AccountConfiguration from './account_configuration';

const mapStateToProps = ({session}) => ({
  currentUser: session.currentUser
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(AccountConfiguration));
