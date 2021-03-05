import React, { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useHistory } from 'react-router-dom';
import { useMessage } from '../hooks/message.hook';

const emptyForm = {
  name: '',
  gender: '',
  birthday: '',
  city: ''
}

export const Form = ({ profile, isEdit }) => {

  const { error, clearError, request, loading } = useHttp();
  const message = useMessage();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const [form, setForm] = useState( profile || emptyForm );

  const birthDate = useRef(null);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    window.M.updateTextFields();
    window.M.Datepicker.init(birthDate.current, {
      format: 'dd.mm.yyyy'
    });
  }, []);


  const createProfile = async () => {
    try {
      const data = await request('/api/profile/generate', 'POST',
        { ...form, birthday: birthDate.current.value }, {});
      history.push(`detail/${data.profile._id}`);
    } catch (error) {
    }
  };

  const updateHandler = async profileId => {
    try {
      const fetched = await request(`/api/profile/${profileId}`, 'PUT', 
      { ...form, birthday: birthDate.current.value }, {});
      history.push(`detail/${profileId}`);
    } catch (error) {}
  };

  const resetHandler = () => {
    setForm(emptyForm);
  };

  return (
    <>
      <div className='input-field col s8 offset-s2'>
        <input
          placeholder='Your name'
          id='name'
          type='text'
          name='name'
          value={form.name}
          onChange={changeHandler}
          disabled={loading}
        />
        <label htmlFor='name'>Enter name</label>
      </div>

      <div className="search-input-field col s8 offset-s2">
        <label htmlFor='gender'>Gender</label>
        <div>
          <select
            className="browser-default"
            id='gender'
            name='gender'
            value={form.gender}
            onChange={changeHandler}>
            <option value="" disabled id="default-select">Any</option>
            <option value="Мужской">Men</option>
            <option value="Женский">Women</option>
          </select>
        </div>
      </div>

      <div className='input-field col s8 offset-s2'>
        <input
          placeholder='Your city'
          id='city'
          type='text'
          name='city'
          value={form.city}
          onChange={changeHandler}
          disabled={loading}
        />
        <label htmlFor="city">Enter city</label>
      </div>

      <div className='input-field col s8 offset-s2'>
        <input
          placeholder='Your Birthday'
          name='birthday'
          id='birthday'
          type='text'
          className='datepicker'
          defaultValue={ form.birthday || ''}
          ref={birthDate}
        />
        <label htmlFor='birthday'>Enter BirthDate</label>
      </div>

      <div className="bottom-row col s4 offset-s4">
        <a className="waves-effect waves-light btn-flat reset-button"
          onClick={resetHandler}>Reset</a>
        {!isEdit && <a className="waves-effect waves-light btn grey accent-4 search-button"
          onClick={createProfile}>Create</a>}
        {isEdit && <a className="waves-effect waves-light btn grey accent-4 search-button"
          onClick={() => updateHandler(profile._id)}>Update</a>}
      </div>
    </>
  )
}