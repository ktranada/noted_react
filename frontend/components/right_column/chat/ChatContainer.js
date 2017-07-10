import { connect } from 'react-redux';

import Chat from './Chat';

function mapStateToProps({ messages }, { match: { params: { channelId } } }) {
  console.log(channelId)
  return {
    messages
  }
}


export default connect(
  mapStateToProps
)(Chat)
