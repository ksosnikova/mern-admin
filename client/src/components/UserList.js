import React from 'react';
//import { Link } from 'react-router-dom';

export const UserList = ({ users, deleteUser, changeUserType }) => {

  return (
    <table>
    <thead>
      <tr>
        <th>#</th>
        <th>email</th>
        {/* <th>профили</th> */}
        <th>account type</th>
        <th>edit</th>
        <th>delete</th> 
      </tr>
    </thead>

    <tbody>
      {users.map((user, index) => {
        return (
          <tr key={user._id}>
            <td>{index + 1}</td>
            <td>{user.email}</td>
            {/* <td><Link to={`api/profiles/${user._id}`}>профили</Link></td> */}
            <td>{user.isAdmin ? 'admin' : 'user'}</td>
            <td>
              <a onClick={() => changeUserType(user._id)}>make { user.isAdmin ? 'user' : 'admin'}</a>
            </td>
            <td>
              <a><i className="material-icons prefix" onClick={() => deleteUser(user._id)}>delete_forever</i></a>
            </td> 
          </tr>
        )
      })}
    </tbody>
  </table>
  )
}