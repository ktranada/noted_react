import { connect } from 'react-redux';
import App from './app';

const mapStateToProps = ({session}) => ({
  isLoggedIn: Boolean(session.currentUser)
})

export default connect(
  mapStateToProps,
  null
)(App)
