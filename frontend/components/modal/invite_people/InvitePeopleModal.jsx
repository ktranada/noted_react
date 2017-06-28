import React from 'react';
import ModalOverlayContainer from '../ModalOverlayContainer';
import InviteForm from './InviteForm';
import InviteResults from './InviteResults';
import { asArray } from '../../../reducers/selectors';

class InvitePeopleModal extends React.Component {
  constructor(props) {
    super(props);


    this.addInviteRow = this.addInviteRow.bind(this);
    this.removeInviteRow = this.removeInviteRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      invites: [{
        key: 0,
        recipient_email: '',
        isValid: true
      }],
      serializedCount: 0,
      results: null
    }
  }

  addInviteRow() {
    const nextCount = this.state.serializedCount + 1;
    this.setState({
      invites: [...this.state.invites, {
        key: nextCount,
        recipient_email: '',
        isValid: true
      }],
      serializedCount: nextCount
    });
  }

  removeInviteRow(key) {
    return () => {
      this.setState({
        invites: [...this.state.invites].filter(invite => invite.key !== key ),
      })
    }
  }

  handleChange(pos) {
    return (e) => {
      let invites = [...this.state.invites];
      invites[pos].recipient_email = e.currentTarget.value;
      this.setState({ invites })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let hasErrors = false;
    const invites = [...this.state.invites]
      .map(invite => {
        if (!invite.recipient_email.trim()) {
          hasErrors = true;
          invite['isValid'] = false;
        } else {
          invite['isValid'] = true;
        }
        return invite;
      });

    if (hasErrors) {
      this.setState({ invites });
    } else {
      const that = this;
      this.props.createInvites({ board_id: this.props.currentBoard.id, invites })
        .then(invites => {
            let results = {
              errors: invites.errors,
              success: asArray(invites.byId),
              count: invites.count
            }
            that.setState({ results });
          })
        }
  }

  render() {
    return (
      <ModalOverlayContainer modalType="invite">
        {
          this.state.results === null ?
          (<InviteForm
            invites={this.state.invites}
            remainingInviteCount={this.props.remainingInviteCount}
            addInviteRow={this.addInviteRow}
            removeInviteRow={this.removeInviteRow}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}/>) :
          (<InviteResults
            hideModal={this.props.hideModal}
            results={this.state.results}/>)
        }
      </ModalOverlayContainer>
    )
  }
}
export default InvitePeopleModal;
