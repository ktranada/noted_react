import React from 'react';
import PropTypes from 'prop-types';

import { ActionCable } from '../../../util/ActionCableProvider';
import Select from '../../../form_elements/Select';
import Spinner from '../../../util/Spinner';

const propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired,
  }),
  handleAccountUpdate: PropTypes.func.isRequired
}


class AccountOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.currentUser.email,
      timezone: this.props.currentUser.timezone,
      errors: [],
      timezones: [],
      isSubmitting: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimeZoneSelect = this.handleTimeZoneSelect.bind(this);
    this.hasChanged = this.hasChanged.bind(this);
  }

  componentDidMount() {
    this.props.requestTimeZones().then(
      timezones => {
        this.setState({
          timezones
        });
      }
    )
  }

  handleEmailChange(e) {
    this.setState({
      email: e.currentTarget.value,
      errors: [],
    })
  }

  handleTimeZoneSelect(timezone) {
    this.setState({
      timezone
    })
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.email.trim()) {
      return;
    } else if (!this.hasChanged()) {
      return;
    }

    const currentTimeZone = this.props.currentUser.timezone;
    this.props.handleAccountUpdate({
      id: this.props.currentUser.id,
      email: this.state.email.trim(),
      timezone: this.state.timezone
    }, currentTimeZone).then(
      nextTimeZone => {
        this.setState({ errors: [], isSubmitting: false });
        this.refs.timeZoneChannel.perform('reload_user');
      },
      errors => this.setState({ errors: errors.email, isSubmitting: false })
    )

    this.setState({ isSubmitting: true});
  }

  hasChanged() {
    return this.state.email !== this.props.currentUser.email
           || this.state.timezone !== this.props.currentUser.timezone
  }

  render() {
    return (
      <form
        className="content__board-overview"
        onSubmit={this.handleSubmit}
      >
        <ActionCable
          unsubscribeOnUmount
          ref="timeZoneChannel"
          channel={{channel: 'TimeZoneChannel', user_id: this.props.currentUser.id}}
        />
        <div className="board-overview__title">
          <label data-error={this.state.errors[0]}>EMAIL
            <input
              className={this.state.errors.length ? 'error' : ''}
              onChange={this.handleEmailChange}
              value={this.state.email}/>
          </label>

          <label>TIME ZONE
            <Select
              options={this.state.timezones}
              value={this.state.timezone}
              onSelect={this.handleTimeZoneSelect}
              isFetchingOptions={this.state.timezones.length === 0}
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={!this.hasChanged() || this.state.isSubmitting || this.state.errors.length}
          className="button button-green">
          {this.state.isSubmitting ? <Spinner height={10}/> : "Save"}
        </button>

      </form>
    )
  }
}

AccountOverview.propTypes = propTypes;
export default AccountOverview;
