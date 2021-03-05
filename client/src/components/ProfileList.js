import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from './Modal';

export const ProfileList = ({ profiles, deleteHandler }) => {


  const [id, setId] = useState(null);

  if (!profiles.length) {
    return <p className='center'>No profiles</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>name</th>
          <th>gender</th>
          <th>city</th>
          <th>birthday</th>
          <th>open</th>
          <th>edit</th>
          <th>delete</th>
        </tr>
      </thead>

      <tbody>
        {profiles.map((profile, index) => {
          return (
            <tr key={profile._id}>
              <td>{index + 1}</td>
              <td>{profile.name}</td>
              <td>{profile.gender}</td>
              <td>{profile.city}</td>
              <td>{profile.birthday}</td>
              <td>
                <Link to={`/detail/${profile._id}`}>open</Link>
              </td>
              <td>
                <a><i className="material-icons prefix" onClick={() => setId(profile._id)}>mode_edit</i></a>
                {id === profile._id && <Modal profile={profile} closeModal={() => setId(null)} onClick={() => { setId(null) }} />}
              </td>
              <td>
                <a><i className="material-icons prefix" onClick={() => deleteHandler(profile._id)}>delete_forever</i></a>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}