import React from "react";

export const Profile = ({ username }) => {
  return (
    <div className="profile">
      <h2 className='userName'>{username}</h2> {/* Mostrar el nombre de usuario */}
    </div>
  );
};
