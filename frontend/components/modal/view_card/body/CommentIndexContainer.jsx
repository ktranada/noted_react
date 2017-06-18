import { connect } from 'react-redux';
import { CommentIndex } from './CommentIndex';

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentIndex)
