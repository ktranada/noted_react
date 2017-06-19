import React from 'react';
import ModalOverlayContainer from '../ModalOverlayContainer';
import InviteRow from './InviteRow';

class InvitePeopleModal extends React.Component {
  constructor(props) {
    super(props);


    this.addInviteRow = this.addInviteRow.bind(this);
    this.removeInviteRow = this.removeInviteRow.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      invites: this.props.invites.byId
    }
  }

  addInviteRow() {
    this.props.createInvite();
  }

  removeInviteRow(id) {
    return () => {

    }
  }

  handleChange(id) {
    return (e) => {
      this.setState({
        invites: {
          [this.state.invites[id]]: {
            email: e.currentTarget.value
          }
        }
      });
    }
  }

  render() {
    const inviteCount = this.props.invites.length;
    return (
      <ModalOverlayContainer>
        <div className="invite-modal__wrapper">
          <div className="invite-modal__content">
            <h2>Invite Board Members</h2>
            {
              this.props.invitesArray.map(({id, email}) => (
                <InviteRow
                  key={id}
                  value={email}
                  inviteCount={inviteCount}
                  handleRemove={this.removeInviteRow(id)}
                  handleChange={this.handleChange(id)}/>
              ))
            }
            <div
              role="button"
              className="invite__add"
              onClick={this.addInviteRow}>
              <i className="material-icons">&#xE148;</i>
              Add Another
            </div>
          </div>
        </div>
      </ModalOverlayContainer>
    )
  }
}
export default InvitePeopleModal;
