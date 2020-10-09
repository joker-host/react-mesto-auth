import React from 'react';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { authorize } from '../utils/mestoAuth.js';

function Login({ handleLogin, onFail, setOnFail }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!email || !password) {
      console.error('Не заполнены некоторые обязательные поля');
    }

    authorize(email, password)
      .then((data) => {
        if (data.token) {
          resetForm();
          handleLogin();
          setOnFail('');
          history.push('/main');
        } else if (data.message) {
          setOnFail(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='auth'>
      <h2 className='auth__title'>Вход</h2>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input
          className='auth__input'
          type='email'
          required={true}
          placeholder='Email'
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <div className='auth__input-container'>
          <input
            className='auth__input'
            type='password'
            placeholder='Пароль'
            onChange={(evt) => setPassword(evt.target.value)}
          />
          <p className='auth__error-field'>{onFail}</p>
        </div>
        <button type='submit' className='auth__submit-button'>
          Войти
        </button>
        <Link className='auth__link-to-sign-in' to='/signup'>
          Ещё не зарегистрированы? Регистрация
        </Link>
      </form>
    </div>
  );
}

export default Login;
