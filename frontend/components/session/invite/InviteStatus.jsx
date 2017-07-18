import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
  status: PropTypes.string.isRequired
}

const InviteStatus = ({ status }) => (
  <div>
    {
      status === 'revoked'
        ? (
          <div>
            <p className="">This invitation has been revoked.</p>
            <p style={{marginTop: 0}}>Please contact the board administrator.</p>
          </div>
        )
        : <p className="invite__responded">It looks like this invitation has a response already.</p>
    }
    <Link to="/boards"><button type="button" className="button button-green">Home</button></Link>
  </div>
)

InviteStatus.propTypes = propTypes;

export default InviteStatus;
