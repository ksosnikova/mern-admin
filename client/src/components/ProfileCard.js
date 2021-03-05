import React from 'react';

export const ProfileCard = ({ profile }) => {
  
  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Gender: {profile.gender}</p>
      <p>City: {profile.city}</p>
      <p>Birthday: {profile.birthday}</p>
    </div>
  )
}