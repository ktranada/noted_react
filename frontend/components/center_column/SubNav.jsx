import React from 'react';
import PropTypes from 'prop-types';
import BoardSettings from './top_section/BoardSettings';
import SubNavActions from './middle_section/SubNavActions';
import SubNavDefault from './SubNavDefault';

class SubNav extends React.Component {
  constructor(props) {
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(type) {
    this.props.toggleModal(type);
  }

  render() {
    if (this.props.isLoading) {
      return <SubNavDefault isLoading={true}/>;
    }

    let inviteButton = null;
    const { currentBoard, members, channels } = this.props;
    if (currentBoard.isLoaded && members.length === 0) {
      inviteButton = (
        <div className="initial-invite-display">
          <button
            type="button"
            onClick={this.toggleModal('INVITE_PEOPLE')}
            className="button button-green">
            <i  aria-hidden className="material-icons">&#xE7FB;</i>Invite People
          </button>
          <i aria-hidden className="material-icons">&#xE14C;</i>
        </div>
      )
    }

    return (
      <div>
        {
          currentBoard.owner &&
          <BoardSettings
            toggleModal={this.toggleModal}
            board={currentBoard}/>
        }
        <hr />
        { inviteButton }
        { inviteButton && <hr />}
        <SubNavActions
          isViewingCard={this.props.location.pathname.includes('card')}
          boardId={currentBoard.id}
          members={members}
          channels={channels}/>
      </div>
    )
  }
}

SubNav.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object),
  members: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  currentBoard: PropTypes.object,

  toggleModal: PropTypes.func
}

SubNav.defaultProps = {
  channels: [],
  members: [],
  isLoading: true,
  currentBoard: {}
}

export default SubNav;
