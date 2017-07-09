import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';

import ModalOverlayContainer from '../ModalOverlayContainer';
import InviteForm from './InviteForm';
import InviteResults from './InviteResults';
import { asArray } from '../../../reducers/selectors';
import { BOARD_SETTINGS, OPTIONS_GOTO_TAB } from '../../../actions/modal_actions';

const propTypes = {
  createInvites: PropTypes.func.isRequired,
  remainingInviteCount: PropTypes.number.isRequired
}

function initialState(remainingInviteCount) {
  return {
    invites: [{
      key: 0,
      email: '',
      isValid: true
    }],
    isSubmitting: false,
    results: null,
    remainingInviteCount
  };
}

class InviteMembersModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = merge({}, initialState(this.props.remainingInviteCount - 1));

    this.addInviteRow = this.addInviteRow.bind(this);
    this.removeInviteRow = this.removeInviteRow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showInviteForm = this.showInviteForm.bind(this);
    this.showPendingInvitesModal = this.showPendingInvitesModal.bind(this);
  }

  addInviteRow() {
    this.setState({
      invites: [...this.state.invites, {
        key: this.state.invites.length,
        email: '',
        isValid: true
      }],
      remainingInviteCount: this.state.remainingInviteCount - 1
    });
  }

  removeInviteRow(key) {
    return () => {
      this.setState({
        invites: [...this.state.invites].filter(invite => invite.key !== key ),
        remainingInviteCount: this.state.remainingInviteCount + 1
      })
    }
  }

  handleChange(pos) {
    return (e) => {
      let invites = [...this.state.invites];
      invites[pos].email = e.currentTarget.value;
      this.setState({ invites })
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let hasErrors = false;
    const invites = [...this.state.invites]
      .map(invite => {
        if (!invite.email.trim()) {
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
            that.setState({ results, isSubmitting: false });
          });
      this.setState({ isSubmitting: true });
    }
  }

  showInviteForm(e) {
    this.setState(initialState(this.props.remainingInviteCount));
  }

  showPendingInvitesModal() {
    this.props.toggleModal(BOARD_SETTINGS, { [OPTIONS_GOTO_TAB]: 'Invites' });
  }

  render() {
    return (
      <ModalOverlayContainer modalType="invite">
        {
          this.state.results === null ?
          (<InviteForm
            canInvite={this.props.remainingInviteCount > 0}
            isSubmitting={this.state.isSubmitting}
            invites={this.state.invites}
            remainingInviteCount={this.state.remainingInviteCount}
            addInviteRow={this.addInviteRow}
            removeInviteRow={this.removeInviteRow}
            showPendingInvitesModal={this.showPendingInvitesModal}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}/>) :
          (<InviteResults
            remainingInviteCount={this.props.remainingInviteCount}
            showInviteForm={this.showInviteForm}
            showPendingInvitesModal={this.showPendingInvitesModal}
            hideModal={this.props.hideModal}
            results={this.state.results}/>)
        }
      </ModalOverlayContainer>
    )
  }
}

InviteMembersModal.propTypes = propTypes;

export default InviteMembersModal;
