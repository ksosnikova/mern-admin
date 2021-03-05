import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = ({ isAdmin }) => {

  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/')
  }

  return (
    <nav>
      <div className="nav-wrapper teal lighten-3">
      { isAdmin ? <span className="brand-logo"><NavLink to='/admin'>Admin</NavLink></span> :
        <span href="/" className="brand-logo">Profile</span> }
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><NavLink to='/create'>Create</NavLink></li>
          <li><NavLink to='/profiles'>Profiles</NavLink></li>
          <li><a onClick={logoutHandler}>LogOut</a></li>
        </ul>
      </div>
    </nav>
  )
}