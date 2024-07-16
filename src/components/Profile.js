import React from "react";
import PropTypes from "prop-types";

export const Profile = ({ username }) => {
  return (
    <div className="profile">
      <h2 className='userName'>{username}</h2> {/* Mostrar el nombre de usuario */}
    </div>
  );
};

Profile.propTypes = {
  username: PropTypes.string.isRequired,
};
