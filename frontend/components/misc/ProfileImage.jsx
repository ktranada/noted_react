import React from 'react';
import PropTypes from 'prop-types';

const ProfileImage = ({src, placeholder}) => {
  if (!Boolean(src)) {
    return (
      <div
        data-placeholder={placeholder[0]}
        className="profile-image__placeholder" />
    )
  }
}

ProfileImage.propTypes = {
  src: PropTypes.string,
  placeholder: PropTypes.string.isRequired
}

export default ProfileImage;
