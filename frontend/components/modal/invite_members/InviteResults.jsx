import React from 'react';
import PropTypes from 'prop-types';

import InviteResultSuccess from './InviteResultSuccess';
import InviteResultErrors from './InviteResultErrors';

const propTypes = {
  results: PropTypes.shape({
    errors: PropTypes.array.isRequired,
    success: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired
  }).isRequired
}

function InviteResults(props) {
  const { success, errors, count } = props.results;
  const isSuccess = success.length === count;
  const isFailure = !isSuccess && errors.length === count;
  const isPartialSuccess = !isFailure && errors.length;

  return (
    <div className="invite-modal__content results">
      <h2>
        {
          isSuccess ?  "Invitations Sent!" :
            isFailure ? "Invitations could not be sent." :
              "That was a partial success."
        }
      </h2>
      <div className="results__container">
        { !!success.length && <InviteResultSuccess success={success} /> }
        { !!errors.length && <InviteResultErrors errors={errors} />}
      </div>
      <div className="results__actions">
        <button
          onClick={props.hideModal}
          className="button button-green results-button">
          Done
        </button>
      </div>
    </div>
  )
}

InviteResults.propTypes = propTypes;
export default InviteResults;
