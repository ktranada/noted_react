import {connect } from 'react-redux';
import AccountConfiguration from './AccountConfiguration';

const mapStateToProps = ({session}) => ({
  currentUser: session.currentUser
});

export default connect(
  mapStateToProps,
  null
)(AccountConfiguration);
