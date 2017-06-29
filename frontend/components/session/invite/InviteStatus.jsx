import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const InviteStatus = ({ status }) => (
  <div>
    <p className="invite__responded">
      {
        status === 'revoked' ?
          "This invitation has been revoked. Please contact the board administrator." :
          "It looks like this invitation has a response already."
      }
    </p>
    <Link to="/boards"><button type="button" className="button button-green">Home</button></Link>
  </div>
)

InviteStatus.propTypes = {
  status: PropTypes.string.isRequired
}

export default InviteStatus;
