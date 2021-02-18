import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export const AuthPage = () => {

  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  } , [error, message, clearError])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      console.log('Data', data)
      auth.login(data.token, data.userId);
    } catch (e) {
      
    }
  }

  return(
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Админ</h1>
        <div className="card teal darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>

            <div className="input-field">
            <input 
              //placeholder="Enter email" 
              id='email' 
              type='text' 
              name='email'
              className='orange-input'
              onChange={changeHandler}
              />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-field">
            <input 
              //placeholder="Enter password" 
              id='password' 
              type='password' 
              name='password'
              className='orange-input'
              onChange={changeHandler}
              disabled={loading}
              />
            <label htmlFor="password">Password</label>
          </div>

           <div>
           </div>
          </div>
          <div className="card-action">
           <button  
            className='btn deep-orange darken-1'
            onClick={loginHandler}
            disabled={loading}
            >Войти</button>
           <button 
            className='btn grey lighten-2 black-text'
            onClick={registerHandler}
            disabled={loading}
            >Регистрация</button>
          </div>
        </div>
      </div>
    </div> 
  )
}